export default {
  '@global': {
    'code, pre': {
      color: '#f8f8f2',
      background: 'none',
      textShadow: '0 1px rgba(0, 0, 0, 0.3)',
      fontFamily: 'Consolas, Monaco, \'Andale Mono\', \'Ubuntu Mono\', monospace',
      textAlign: 'left',
      whiteSpace: 'pre',
      wordSpacing: 'normal',
      wordBreak: 'normal',
      wordWrap: 'normal',
      lineHeight: '1.5',
      M: 'none',
      O: '4',
      tabSize: '4',
      W: 'none',
      fallbacks: [
        {
          M: 'none'
        },
        {
          M: '4'
        }
      ],
      hyphens: 'none'
    },
    pre: {
      padding: '1em',
      margin: '.5em 0',
      overflow: 'auto',
      borderRadius: '0.3em'
    },
    ':not(pre)>code, pre': {
      background: '#272822'
    },
    ':not(pre)>code': {
      padding: '.1em',
      borderRadius: '.3em',
      whiteSpace: 'normal'
    },
    '.token.comment, .token.prolog, .token.doctype, .token.cdata': {
      color: 'slategray'
    },
    '.token.punctuation': {
      color: '#f8f8f2'
    },
    '.namespace': {
      opacity: '.7'
    },
    '.token.property, .token.tag, .token.constant, .token.symbol, .token.deleted': {
      color: '#f92672'
    },
    '.token.boolean, .token.number': {
      color: '#ae81ff'
    },
    '.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted': {
      color: '#a6e22e'
    },
    '.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string, .token.variable': {
      color: '#f8f8f2'
    },
    '.token.atrule, .token.attr-value, .token.function': {
      color: '#e6db74'
    },
    '.token.keyword': {
      color: '#66d9ef'
    },
    '.token.regex, .token.important': {
      color: '#fd971f'
    },
    '.token.important, .token.bold': {
      fontWeight: 'bold'
    },
    '.token.italic': {
      fontStyle: 'italic'
    },
    '.token.entity': {
      cursor: 'help'
    }
  }
}
