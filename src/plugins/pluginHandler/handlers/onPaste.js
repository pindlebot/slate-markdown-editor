// @flow
import { getEventTransfer } from 'slate-react'
import { fromMarkdown } from '../helpers'
import { type Change } from 'slate'

function onPaste (event: *, change: Change) {
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