import Prism from "prismjs";

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

const grammar = Prism.languages.markdown
export default text => Prism.tokenize(text, grammar)