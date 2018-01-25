import flatten from 'lodash.flatten'

const getText = node => node.nodes.reduce((acc, val) => 
  acc += val.leaves.reduce((acc, val) => 
    acc += val.text
  ,'')
,'')

function handleNode(node, lines = []) {
  if(node.object === 'text') {
    lines.push(
      node.leaves.reduce((acc, val) => acc += val.text, '')
    )
    return lines;
  }

  if(Array.isArray(node)) {
    lines = lines.concat(flatten(
      node.map(n => 
        handleNode(n)
      )
    ))
    return lines;
  }

  switch(node.type) {
    case 'pre':
      let codeLines = 
      [ 
        '```' + node.data.lang || '',
        ...flatten(
          node.nodes.map(node => 
            handleNode(node)
          )
        ),
        '```'
      ]
      lines = lines.concat(codeLines)
    break
    case 'blockquote': 
      lines = lines.concat(flatten(
        node.nodes.map(node => 
          handleNode(node).map(out => '> ' + out)
        )
      ))
      break;
    case 'ul':  
      lines.push(handleNode(node.nodes))
      break;
    case 'heading':
      let mark = '#'.repeat(node.data.depth) 
      lines.push(mark + ' ' + getText(node))
      break; 
    case 'li':
      node.nodes.forEach(node => {
        lines.push('- ' + handleNode(node))
      })
      console.log(lines)
      break;
    case 'code':     
    case 'p':
     default:
      lines.push(getText(node))
  }
  
  return flatten(lines);
}

function valueToMarkdown (value) {
  let json = value.toJSON()
  let { nodes } = json.document;
  
  let lines = []

  for(let node of nodes) {
    lines = handleNode(node, lines)
  }

  return lines.join('\n')
}

export default valueToMarkdown
