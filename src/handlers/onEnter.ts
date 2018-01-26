import * as curry from 'lodash.curry'
import toggleCode from '../plugins/toggleCode'
import { getPrevious, clear } from '../util'

function onEnter (props, event, change) {
  if(/\s*`{3}.*/.test(change.value.startBlock.text)) {
    return toggleCode(props, event, change)
  }    

  let prev = getPrevious(change)

  if(
    prev && 
    prev.type == 'code_line' &&       
    !prev.text &&
    !change.value.startBlock.text
  ) {
    event.preventDefault()   
    change.call(clear)  
    return toggleCode(props, event, change)
  }
  
  return
}

export default onEnter