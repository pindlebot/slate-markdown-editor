import Prism from "prismjs";

Prism.languages.markdownDecorators = Prism.languages.extend('markup', {})

Prism.languages.insertBefore('markdownDecorators', 'prolog', {
	//'code': [
	//	{
	//		// Prefixed by 4 spaces or 1 tab
	//		pattern: /^(?: {4}|\t).+/m,
	//		alias: 'keyword'
	//	},
	//	{
	//		// `code`
	//		// ``code``
	//		pattern: /`.+?|`[^`\n]+`/,
	//		alias: 'keyword'
	//	}
	//],
	code: {
		pattern: /`[^`\n]+`/,
		aliast: 'keyword'
	},
	'url-reference': {
		// [id]: http://example.com "Optional title"
		// [id]: http://example.com 'Optional title'
		// [id]: http://example.com (Optional title)
		// [id]: <http://example.com> "Optional title"
		pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
		inside: {
			'variable': {
				pattern: /^(!?\[)[^\]]+/,
				lookbehind: true
			},
			'string': /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
			'punctuation': /^[\[\]!:]|[<>]/
		},
		alias: 'url'
	},
	'bold': {
		// **strong**
		// __strong__

		// Allow only one line break
		pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
		lookbehind: true,
		inside: {
			'punctuation': /^\*\*|^__|\*\*$|__$/
		}
	},
	'italic': {
		// *em*
		// _em_

		// Allow only one line break
		pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
		lookbehind: true,
		inside: {
			'punctuation': /^[*_]|[*_]$/
		}
	},
	'url': {
		// [example](http://example.com "Optional title")
		// [example] [id]
		pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
		inside: {
			'variable': {
				pattern: /(!?\[)[^\]]+(?=\]$)/,
				lookbehind: true
			},
			'string': {
				pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
			}
		}
  },
});

const clone = Prism.util.clone
const grammar = Prism.languages.markdownDecorators

Prism.languages.markdownDecorators['bold'].inside['url'] = clone(
	grammar['url']
);
Prism.languages.markdownDecorators['italic'].inside['url'] = clone(
	grammar['url']
);
Prism.languages.markdownDecorators['bold'].inside['italic'] = clone(
	grammar['italic']
);
Prism.languages.markdownDecorators['italic'].inside['bold'] = clone(
	grammar['bold']
);

export default str => Prism.tokenize(str, grammar)