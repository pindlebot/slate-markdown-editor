// @flow
import {
  insertOrderedList,
  insertUnorderedList,
  insertBlockquote
} from '../changes'
import { log } from '../helpers'
import { type Change, type Editor } from 'slate' // eslint-disable-line

function onSpace (event: *, change: Change, editor: Editor) {
  const args = [event, change, editor]
  log('onSpace', args)
  const { value } = change
  if (value.isExpanded) return
  const { startBlock: { text } } = value

  switch (true) {
    case /^\s*[*+-]\s*$/.test(text):
      return insertUnorderedList(...args)
    case /^\s*\d\.\s*$/.test(text):
      return insertOrderedList(...args)
    case /^\s*>\s*$/.test(text):
      return insertBlockquote(...args)
    default:
  }
}

export default onSpace
