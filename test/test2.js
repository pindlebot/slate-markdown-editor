const Prism = require('prismjs')
const { Value, Node, Block, Text, Document } = require('slate')

Prism.languages.markdown = Prism.languages.extend('markup', {});
Prism.languages.insertBefore('markdown', 'prolog', {
	blockquote: {
		pattern: /^>(?:[\t ]*>)*/m,
		alias: 'mark',
  },
	code: [{
    pattern: /`{3}([\s\S]+)`{3}\n?/,
    inside: {
      lang: {
        pattern: /(`{3})[^\n]+/,   
        lookbehind: true,   
      },
      text: {
        pattern: /[^`]+(?=`{3})/
      }
    }
	}],
	heading: [{
		pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
		inside: {
      mark: /==+$|--+$/,
      text: /[^\s].*\n{0,1}/
		}
	}, {
		pattern: /(^\s*)#+.+/m,
		lookbehind: true,
		inside: {
      mark: /^#+|#+$/,
      text: /[^\s].*\n{0,1}/
		}
	}],
	hr: {
		pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
		lookbehind: true,
	},
	li: {
    pattern: /([\s\t]*[*+-]\s).*\n?/m,
    inside: {
      text: {
        pattern: /[^*+-\s].*/,
      },
      spaces: {
        pattern: / +[^*+-]/
      },
      tabs: {
        pattern: /\t+[^*+-]/
      }
    }
  },
  p: {
    pattern: /.+/,
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

const block = {
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

function parse(content) {
  let tokens = tokenize(content)
  tokens = tokens.filter(tok => typeof tok === 'object')

  let out = [];
  while(tokens.length) {
    let tok = tokens.shift()
    let fn = block[tok.type]
    let data = {}

    let node = typeof tok.content === 'string' ? 
      tok : tok.content.find(content => content.type === 'text')
    //console.log(content)

    if(tok.type === 'heading') {
      let mark = tok.content.find(content => content.type === 'mark')
      data.depth = mark.length
    }
    
    out.push(
      fn({
       text: node.content,
       data
      })
    )
  }
  console.log(JSON.stringify(out))
  return out;
}

let out = parse('lorem ipsum\n```js\nvar x\nvar y\n```\n## h2 title\n- item 1\n- item 2')