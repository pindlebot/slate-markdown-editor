import * as curry from 'lodash.curry'
import onModEnter from '@menubar/slate-edit-code/dist/handlers/onModEnter'
import * as plugins from './'
import * as options from './options'
import { log } from '../util'

const remove = change => change
  .removeNodeByKey(change.value.startBlock.key)

const getParent = change => change.value.document.getParent(change.value.startBlock.key)

const isInCodeBlock = change => change.value.document.getClosest(
  change.value.startKey,
  block => block.type === 'code_block'
)

function toggleCode (event, change, editor) {
  log('toggleCode', [event, change, editor])

  if(!isInCodeBlock(change)) {    
    
    let toggle = plugins.editCode
      .changes.toggleCodeBlock(change, "paragraph").focus()

    editor.props.onChange(toggle)
      
    //let parentNode = getParent(change)
    //change.setNodeByKey(parentNode.key, { data: { syntax }})
  } else {
    console.log('onModEnter')
    remove(change)
    onModEnter(options.editCodeOptions, event, change, {})
  }

  return true;  
};

export default toggleCode