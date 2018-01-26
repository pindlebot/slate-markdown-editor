import * as curry from 'lodash.curry'
import onModEnter from '@menubar/slate-edit-code/dist/handlers/onModEnter'
import * as plugins from './'
import * as options from './options'

const remove = change => change
  .removeNodeByKey(change.value.startBlock.key)

const getParent = change => change.value.document.getParent(change.value.startBlock.key)

const isInCodeBlock = change => change.value.document.getClosest(
  change.value.startKey,
  block => block.type === 'code_block'
)

function toggleCode (props, event, change) {
  console.log([props, event, change])
  if(!isInCodeBlock(change)) {
    event.preventDefault()   
    change
      .extendToStartOf(change.value.startBlock)  
      .delete()  

    props.onChange(
      plugins.editCode
        .changes.toggleCodeBlock(change, "paragraph").focus()
    )
      
    //let parentNode = getParent(change)
    //change.setNodeByKey(parentNode.key, { data: { syntax }})
  } else {
    remove(change)
    onModEnter(options.editCodeOptions, event, change, {})
  }

  return true;  
};

export default toggleCode