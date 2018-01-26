import onModEnter from 'slate-edit-code/dist/handlers/onModEnter'
import * as plugins from './plugins'

const remove = change => change
  .removeNodeByKey(change.value.startBlock.key)

const getParent = change => change.value.document.getParent(change.value.startBlock.key)

const isInCodeBlock = change => change.value.document.getClosest(
  change.value.startKey,
  block => block.type === 'code_block'
)

function toggleCode (event, change, onChange, syntax = 'language-js') {
  if(!isInCodeBlock(change)) {
    event.preventDefault()   
    change
      .extendToStartOf(change.value.startBlock)  
      .delete()  

    onChange(
      plugins.editCode
        .changes.toggleCodeBlock(change, "paragraph").focus()
    )
      
    let parentNode = getParent(change)
    change.setNodeByKey(parentNode.key, { data: { syntax }})
  } else {
    remove(change)
    onModEnter(plugins.editCodeOptions, event, change, {})
  }

  return true;  
};

export default toggleCode;