import { Value, Node, Block, Text, Document } from 'slate'
import * as marked from 'marked'
import findIndex from 'lodash.findindex'
import flatten from 'lodash.flatten'
import tokenize from './tokenize'
import schema from '../constants/schema'

const createText = string => ({
  object: 'text',
  leaves: [{
    object: 'leaf',
    text: string,
    marks: []
  }]
})

const createBlock = (type, data = {}) => ({
  ...Node.createProperties(type),
  object: 'block',
  isVoid: false,
  data: data,
})

const createValue = (nodes) => ({
  object: 'value',
  document: {
    object: 'document',
    data: {},
    nodes: nodes
  }
})

const toJSON = {
	blockquote: props => ({
		...createBlock('blockquote', props.data),
		//nodes: props.text ? [toJSON.p({...props})] : []
		nodes: props.nodes ? props.nodes : [toJSON.p({...props})]
	}),
	li: props => ({
		...createBlock('ul', {}),
		nodes: [{
			...createBlock('li', props.data),
			nodes: props.text ? [
				createText(props.text)
			] : []
		}]
	}),
  heading: props => ({
		...createBlock('heading', props.data),
		nodes: [createText(props.text)]
	}),
	p: props => ({
		...createBlock('p', props.data),
		nodes: [createText(props.text)]
	}),
	code: props => ({
    ...createBlock('pre', props.data),
		nodes: [{
			...createBlock('code', {}),
			nodes: props.text ? [
				createText(props.text)
			] : []
		}]
	})
}

function getText (tok) {
	let text = tok.content.find(content => content.type === 'text')
	if(text) {
		return text.content;
	}

	return ''
}

function parse(content) {
	let tokens = tokenize(content)
	console.log(tokens)
  tokens = tokens.filter(tok => typeof tok === 'object')

	let out = [];
	
  while(tokens.length) {
    let tok = tokens.shift()
    let fn = toJSON[tok.type]
    let data = {}
		let nodes;

    let node = typeof tok.content === 'string' ? 
      tok : tok.content.find(content => content.type === 'text')

    if(tok.type === 'heading') {
      let mark = tok.content.find(content => content.type === 'mark')
      data.depth = mark.content.length
		}
		
		if(tok.type === 'code') {
			let lang = tok.content.find(content => content.type === 'lang')
			data.lang = lang.content.trim()
		}

		if(tok.type === 'blockquote') {
			let arr = tok.content.filter(
				c => typeof c === 'object' && c.type !== 'text'
			)
			
			if(arr) {
				nodes = arr.map(item => (
					toJSON[item.type]({text: getText(item)})
				))
				console.log(nodes)
			}
		}
    
    out.push(
      fn({
       text: node && node.content ? node.content : undefined,
			 data,
			 nodes
      })
    )
  }

	return out;
}

export default function fromMarkdown(content) {
  let blocks = parse(content)
	let nodes = []

	while(blocks.length) {
		 let currentNode = blocks.shift()
		 let prevNode = nodes.length ? nodes[nodes.length - 1] : undefined
		 
		 if(
			 prevNode &&
			 prevNode.type == currentNode.type &&
			 ['blockquote', 'ul'].indexOf(prevNode.type) > -1
		 ) {
			nodes[nodes.length - 1] = {
				...prevNode,
				nodes: [
					...prevNode.nodes,
					...currentNode.nodes
				]
			}
			continue;
		 }

		 nodes.push(currentNode)
	}

	return createValue(nodes)
}
