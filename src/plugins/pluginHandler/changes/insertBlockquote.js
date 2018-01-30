// @flow
import { clear, getPlugin } from '../helpers'
import { type Change, type Editor } from 'slate'

function WrapInBlockquote (event: *, change: Change, editor: Editor) {

  const editBlockquote = getPlugin(editor, 'slate_edit_blockquote')

  event.preventDefault()     
  change.call(clear)      
  
  editBlockquote.changes.wrapInBlockquote(change)
  return true;
}

export default WrapInBlockquote