import { getEventTransfer } from 'slate-react'
import { fromMarkdown } from '../util'

function onPaste (event, change) {
  const transfer = getEventTransfer(event)
  
  if(!transfer.text) return undefined
  try {
    const value = fromMarkdown(transfer.text)   
    change.insertFragment(value.document) 
    return true    
  } catch(err) {
    console.warn('error', err)
    return undefined;
  }
}

export default onPaste;