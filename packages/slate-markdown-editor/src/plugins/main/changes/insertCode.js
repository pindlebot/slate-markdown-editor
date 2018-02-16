import onModEnter from '@menubar/slate-edit-code/dist/handlers/onModEnter'
import * as options from '../../options'
import { log, getPlugin } from '../helpers'

const remove = change => change
  .removeNodeByKey(change.value.startBlock.key)

const isInCodeBlock = change => change.value.document.getClosest(
  change.value.startKey,
  block => block.type === 'code_block'
)

function toggleCode (event, change, editor) {
  log('toggleCode', [event, change, editor])
  const editCode = getPlugin(editor, 'slate_edit_code')

  if (!isInCodeBlock(change)) {
    // editor.props.onChange(
    //  plugins.editCode
    //  .changes.toggleCodeBlock(change, "paragraph").focus()
    // )

    editCode.changes.wrapCodeBlock(change)
    return true
  } else {
    remove(change)
    onModEnter(options.editCodeOptions, event, change, {})
  }
};

export default toggleCode
