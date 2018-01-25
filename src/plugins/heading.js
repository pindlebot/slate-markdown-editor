const headingRegEx = require('markup-it/lib/markdown/re/heading')

const HEADING = [
  'header_one',
  'header_two',
  'header_three',
  'header_four',
  'header_five',
  'header_six',
]

function onSpace(opts, event, change, editor) {
  let { startBlock } = change.value
  let { text } = startBlock;

  if(headingRegEx.normal.test(text)) {
    let matches = headingRegEx.normal.exec(text)
    let depth = matches[0].length
    let data = { depth }
    
    change
      .extendToStartOf(change.value.startBlock)  
      .delete() 
      .setBlock({type: HEADING[depth - 1], data })
    
    return true;
  }

  return undefined;
}

function onEnter(opts, event, change, editor) {
  let { value: { startBlock } } = change;

  if (startBlock.type.indexOf('header') < 0) return
  
  event.preventDefault()
  
  change
    .splitBlock()
    .setBlock('paragraph')  
  
  return true
}

function onBackspace(opts, event, change, editor) {
  let { value: { startBlock } } = change;  

  if (startBlock.type.indexOf('header') < 0) return
  if (startBlock.text.length !== 0) return
  
  event.preventDefault()

  change.setBlock('paragraph') 

  return true;
}


function onKeyDown(
  opts,
  event,
  change,
  editor,
) {
  const args = [opts, event, change, editor];
   
  if (event.key == ' ') return onSpace(...args)
  else if (event.key == 'Enter') return onEnter(...args)
  else if (event.key == 'Backspace') return onBackspace(...args)
  return undefined;
} 

function core(opts = {}) {
  return {
    onKeyDown: onKeyDown.bind(null, opts)
  }
}

export default core;