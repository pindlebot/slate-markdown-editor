// @flow
import * as curry from 'lodash.curry'
import { 
  wrapInOrderedList, 
  wrapInUnorderedList 
} from '../plugins/wrapInList'
import WrapInBlockquote from '../plugins/wrapInBlockquote'
import { log } from '../util'

function onSpace(event, change, editor) {
  const args = [event, change, editor]
  log('onSpace', args)
  const { value } = change
  if (value.isExpanded) return
  const { startBlock: { text } } = value
   
  switch (true) {
    case /^\s*[*+-]\s*$/.test(text):
      return wrapInUnorderedList(...args)
    case /^\s*\d\.\s*$/.test(text):
      return wrapInOrderedList(...args)
    case /^\s*>\s*$/.test(text): 
      return WrapInBlockquote(...args)
    default: 
      return 
  } 
}

export default onSpace
