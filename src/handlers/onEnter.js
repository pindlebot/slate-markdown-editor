// @flow
import * as curry from 'lodash.curry'
import toggleCode from '../plugins/toggleCode'
import { getPrevious, clear, log } from '../util'

function onEnter (event, change, editor) {
  const args = [event, change, editor]
  log('onEnter', args)

  if(/\s*`{3}.*/.test(change.value.startBlock.text)) {
    event.preventDefault()   
    change.call(clear)  
    return toggleCode(...args)
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
    return toggleCode(...args)
  }
  
  return undefined
}

export default onEnter