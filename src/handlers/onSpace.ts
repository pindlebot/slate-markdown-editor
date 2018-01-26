import * as curry from 'lodash.curry'
import { 
  wrapInOrderedList, 
  wrapInUnorderedList 
} from '../plugins/wrapInList'
import WrapInBlockquote from '../plugins/wrapInBlockquote'

function onSpace(props, event, change) {
  const { value } = change
  if (value.isExpanded) return
  const { startBlock: { text } } = value
   
  switch (true) {
    case /^\s*[*+-]\s*$/.test(text):
      return wrapInUnorderedList(props)(event, change)
    case /^\s*\d\.\s*$/.test(text):
      return wrapInOrderedList(props)(event, change)
    case /^\s*>\s*$/.test(text): 
      return WrapInBlockquote(props)(event, change)
    default: 
      return 
  } 
}

export default curry(onSpace)
