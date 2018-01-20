var BLOCK = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  //fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  //nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  //table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

function fromMarkdown(content) {
  let blocks = []
  let lines = content.split('\n')

  let last = () => blocks[blocks.length - 1]
  let peek = () => lines[0]

  let cap;


  while(lines.length) {
    let text = lines.shift()
    console.log(text)
    
    cap = BLOCK.heading.exec(text)

    
    switch(true) {
      case BLOCK.heading.test(text):
        blocks.push({type: 'heading', text: text.replace(/#{0,6}\s{0,1}/g, '')})
        break;
      case BLOCK.blockquote.test(text):
        blocks.push({type: 'blockquote', text: text.replace(/>\s{0,1}/g, '')})
        break
      case /-{0,2}/.test(text):
        blocks.push({type: 'li', text: text.replace(/[-|\*|\+]\s{0,1}/g, '')})
        break;
      case /```/.test(text):
        let code = ''
       
        while(lines.length && !/```/.test(lines[0])) {
          code += lines.shift()
        }
        
        lines.shift()

        blocks.push({
          type: 'code',
          text: code
        })
        break;
      default: 
        blocks.push({
          type: 'p', text: text
        })
    }
  }
  
  console.log(blocks)
}

fromMarkdown(`
- 1
`)

