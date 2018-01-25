import onModEnter from 'slate-edit-code/dist/handlers/onModEnter'
import * as plugins from './'

const remove = change => change
  .removeNodeByKey(change.value.startBlock.key)

const getParent = change => change.value.document.getParent(change.value.startBlock.key)

function toggleCode (event, change, onChange, syntax = 'language-js') {
  let isInCodeBlock = change.value.document.getClosest(
    change.value.startKey,
    block => block.type === 'code_block'
  )

  if(!isInCodeBlock) {
    onChange(
      plugins.editCode
       .changes.toggleCodeBlock(change, "paragraph").focus()
    )
  
    let parentNode = getParent(change)
    change.setNodeByKey(parentNode.key, { data: { syntax }})
    console.log('parent', parentNode.toJSON())
  } else {
    remove(change)
    onModEnter(plugins.editCodeOptions, event, change, {})
  }

  return true;  
};

export default toggleCode;