// @flow
import { clear, getPlugin } from '../helpers'
import { type Change, type Editor } from 'slate'


export const insertOrderedList = (event: *, change: Change, editor: Editor) => {
  const editList = getPlugin(editor, 'slate_edit_list')

  event.preventDefault()     
  change.call(clear)       
  
  editor.props.onChange(
    editList.changes.wrapInList(
      change,
      'ordered_list'
    ).focus()
  )

  return true;
}

export const insertUnorderedList = (event: *, change: Change, editor: Editor) => {
  const editList = getPlugin(editor, 'slate_edit_list')

  event.preventDefault()     
  change.call(clear)      
  
  editor.props.onChange(
    editList.changes.wrapInList(
      change,
      'unordered_list'
    ).focus()
  )

  return true;
}