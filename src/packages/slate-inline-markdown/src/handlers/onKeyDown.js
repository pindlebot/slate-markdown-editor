import * as changes from '../changes'
import { applyRules, getLastText } from '../util'
import { Inline, Block } from 'slate'
import { inlineMarkdown } from '../../../../plugins/index';

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
  event.preventDefault()
  
  if (token.object == 'mark') {
    change.call(changes.replaceText(token))        
    change.call(changes.insertMark(token))
  
    return true;
  } else if(token.object == 'inline') {
    console.log(token)
    
    if(token.type === 'link' || token.type === 'image') {
      change
       .call(changes.replaceText(token))      
       .wrapInline({
        type: token.type,
        data: token.data,
      })
      .call(changes.insertSpace)
    } else {
      let block = Block.create({
        type: token.type,
        data: token.data,
        isVoid: true,
      })

      change
      .removeNodeByKey(change.value.startBlock.key)
      .insertBlock({
        type: token.type,
        data: token.data,
        isVoid: true,
      })
      .insertBlock('paragraph')
        //.extend(-1 * token.input.length)
        //.wrapInline({
        //  type: token.type,
        //  data: token.data,
        //  isVoid: true
        //})
        //.splitBlock()
        //.setBlock('unstyled')
        //.call(changes.insertSpace)
    }
      
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
  if(event.key == 'Backspace') {
    if(change.value.startBlock.type == 'html') {
      console.log(change.value.startBlock.toJSON())
    }
    return
  }
  return undefined;
} 