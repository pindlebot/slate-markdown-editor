import * as changes from '../changes'
import { applyRules, getLastText } from '../util'

function handle(opts, event, change, editor) {  
  let { startBlock } = change.value;
  if (opts.skip(change)) return

  let text = getLastText(change)
  if (!text) return;

  let tokens = applyRules(opts.rules, opts.schema)(text + event.key)

  if (
    !tokens || 
    !tokens.length ||
    !tokens[0].text
  ) return

  let token = tokens[0]
  console.log(token)

  event.preventDefault()
  
  
  if (token.object == 'mark') {
    change.call(changes.replaceText(token))    
    change.call(changes.insertMark(token))
  
    return true;
  } else if(token.object == 'inline') {
    change
      .extend(-1 * token.input.length)
      .delete()
      .insertInline({
        type: token.type,
        data: token.data,
        isVoid: true
      })
      .call(changes.insertSpace)
      
    return true;
  }
}

export default function onKeyDown(
  opts,
  event,
  change,
  editor
) {
  const args = [opts, event, change, editor];

  if (opts.keys.indexOf(event.key) > -1) return handle(...args)
  return undefined;
} 