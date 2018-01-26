import * as curry from 'lodash.curry'
import { clear } from '../util'
import * as plugins from '../plugins'

function wrapInList (type) {
  return (props, event, change) => {
    event.preventDefault()     
    change.call(clear)      

    props.onChange(
      plugins.editList.changes.wrapInList(
        change,
        type
      ).focus()
    )

    return true;
  }
}

export const wrapInOrderedList = curry(wrapInList('ordered_list'))
export const wrapInUnorderedList = curry(wrapInList('unordered_list'))