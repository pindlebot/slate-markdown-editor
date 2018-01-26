import * as changes from '../changes'
import { applyRules } from '../util'

function onSpace(opts, event, change, editor) {  
  let { startBlock } = change.value;
  if(opts.skip(change)) return

  let leaf = startBlock.getLastText().getLeaves().last().toJSON()
  if(!leaf || !leaf.text) return;

  let tokens = applyRules(leaf.text + event.key)

  if(
    !tokens || 
    !tokens.length || 
    !tokens[0].text
  ) return

  let token = tokens[0]

  event.preventDefault()

  change.call(changes.replaceText(token))
  
  if(token.object == 'mark') {
    change.call(changes.insertMark(token))
  
    return true;
  } else if(token.object == 'inline') {
    change
      .wrapInline({
        type: 'link',
        data: token.data
      })
      .call(changes.insertSpace)
      
    return true;
  }
}

export default onSpace;