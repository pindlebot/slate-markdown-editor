import Prism from "prismjs";

Prism.languages.markdown = Prism.languages.extend('markup', {});
Prism.languages.insertBefore('markdown', 'prolog', {
	blockquote: {
    pattern: /^(>\s).*/m,
    alias: 'mark',
    inside: {}
  },
	code: [{
    pattern: /`{3}([\s\S]+)`{3}\n?/,
    inside: {
      lang: {
        pattern: /(`{3})[^\n]+/,   
        lookbehind: true,   
      },
      text: {
				pattern: /(\n)[^`]+(?=\n`{3})/,
				lookbehind: true,   
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
    pattern: /([\s\t]*[*+-]\s|\d\.).*\n?/m,
    inside: {
      text: {
        pattern: /[^*+-\s|\d\.].*/,
      },
      spaces: {
        pattern: / +[^*+-|\d\.]/
      },
      tabs: {
        pattern: /\t+[^*+-|\d\.]/
      }
    }
  },
  p: {
    pattern: /.+/,
  }
})

const grammar = Prism.languages.markdown

Prism.languages.markdown.blockquote.inside.li = Prism.util.clone(
	Prism.languages.markdown.li
)
Prism.languages.markdown.blockquote.inside.text = /[^-> ].*/

//Prism.hooks.add('', function(env) {
//	console.log('env', env)
//})

export default text => Prism.tokenize(text, grammar)