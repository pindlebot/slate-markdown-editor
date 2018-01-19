import { Value, Node, Block, Text, Document } from 'slate'
import * as marked from 'marked'
import findIndex from 'lodash.findindex'
import flatten from 'lodash.flatten'
import Prism from "prismjs";
import schema from '../constants/schema'

Prism.languages.markdown = Prism.languages.extend('markup', {});
Prism.languages.insertBefore('markdown', 'prolog', {
	blockquote: {
		pattern: /^>(?:[\t ]*>)*/m,
		alias: 'punctuation'
	},
	code: [{
		pattern: /```/,
		alias: 'keyword'	
	}],
	heading: [{
		pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
		alias: 'important',
		inside: {
			punctuation: /==+$|--+$/
		}
	}, {
		pattern: /(^\s*)#+.+/m,
		lookbehind: true,
		alias: 'important',
		inside: {
			punctuation: /^#+|#+$/
		}
	}],
	hr: {
		pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
		lookbehind: true,
		alias: 'punctuation'
	},
	li: {
		pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
		lookbehind: true,
		alias: 'punctuation'
	}
})

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

const blockNodes = {
	blockquote: props => ({
		...createBlock('blockquote', props.data),
		nodes: props.text ? [blockNodes.p({...props})] : []
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
    ...createBlock('pre', {}),
		nodes: [{
			...createBlock('code', props.data),
			nodes: props.text ? [
				createText(props.text)
			] : []
		}]
	})
}

const grammar = Prism.languages.markdown
const tokenize = text => Prism.tokenize(text, grammar)

function parse (string) {
	let tokens = tokenize(string)
	let nodes = []
	
	while(tokens.length) {
		let tok = tokens.shift()
		if(!tok) continue
		console.log('tok', tok)

		if(typeof tok === 'string') {
			nodes.push(
				blockNodes.p({text: tok})
			)
			continue;
		}

		let nextToken = tokens.shift();
		let blockFn = blockNodes[tok.type]
		let text = nextToken;
		let prefix = tok.content;
		let data = {}

		if(typeof nextToken !== 'string') {
			text = tok.content[1]
			prefix = tok.content[0].content
		}
			
		if(tok.type === 'heading') {
			data.depth = prefix.length;
		}

		text = text.replace(' ', '')

		if(text === '' && tok.type === 'p') {
			continue
		}

    if(nodes.length) {
			let node = nodes[nodes.length - 1]

			node.nodes.push(
				blockFn({text, data}) 
			)
			continue;
		}

		nodes.push(
			blockFn({text, data})
		)		
	}

  console.log('nodes', nodes)
	return nodes;
}

export default function fromMarkdown(content) {
	let lines = content.split('\n')
	let i = 0;
	let tmp;
	let out = []

	while(lines.length) {
		let line = lines.shift()
		
		// add to code block if it has been started
		if(tmp) tmp.push(line)
		
		// start a code block
		if(line.indexOf('```') > -1 && !tmp) {
			tmp = [line]
			continue;
		}

		// end code block
		if(line.indexOf('```') > -1) {
			out.push(
				parse([...tmp].join('\n'))
			)
			tmp = undefined
			continue;
		}

		let prevBlock = out.length ? out[out.length - 1] : undefined
		let currentBlock = parse(line)[0]
		
		if(!currentBlock) continue;

		if(
			prevBlock && 
		  prevBlock.type === currentBlock.type &&
			['blockquote', 'ul'].indexOf(prevBlock.type) > -1
		) {
      out[out.length - 1] = {
				...prevBlock,
				nodes: [
					...prevBlock.nodes,
					...currentBlock.nodes
				]
			}
			continue;
		}
		
		out.push(currentBlock)
	}

	return createValue(flatten(out))
}