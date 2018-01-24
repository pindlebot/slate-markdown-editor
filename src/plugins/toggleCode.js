import onModEnter from 'slate-edit-code/dist/handlers/onModEnter'
import * as plugins from './'

const remove = change => change
  .removeNodeByKey(change.value.startBlock.key)

function toggleCode (event, change, onChange) {
  let isInCodeBlock = change.value.document.getClosest(
    change.value.startKey,
    block => block.type === 'code_block'
  )

  if(!isInCodeBlock) {
    onChange(
      plugins.editCode
       .changes.toggleCodeBlock(change, "paragraph").focus()
    )
  } else {
    remove(change)
    onModEnter(plugins.editCodeOptions, event, change, {})
  }

  return true;  
};

export default toggleCode;