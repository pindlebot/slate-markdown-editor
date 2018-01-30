// @flow
import { insertCode } from '../changes'
import { getPrevious, clear, log } from '../helpers'
import { type Change, type Editor } from 'slate'

function onEnter (event: *, change: Change, editor: Editor) {
  const args = [event, change, editor]
  log('onEnter', args)

  if(/\s*`{3}.*/.test(change.value.startBlock.text)) {
    event.preventDefault()   
    change.call(clear)  
    return insertCode(...args)
  }    
  let prev = getPrevious(change)
  
  if(
    prev && 
    prev.type == 'code_line' &&       
    !prev.text &&
    !change.value.startBlock.text
  ) {
    event.preventDefault()   
    //change.call(clear)  
    return insertCode(...args)
  }
  
  return undefined
}

export default onEnter