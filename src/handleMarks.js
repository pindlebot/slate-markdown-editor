const { State } = require('markup-it');
const inlineRe = require('markup-it/lib/markdown/re/inline')
const { Range, Mark } = require('slate')

let rules = Object.keys(inlineRe).map(key => ({key, re: inlineRe[key]}))

function applyRules(text) {
  let tokens = []
  let inlineRules = [...rules]
  console.log('input', text)

  while (inlineRules.length) {
    let rule = inlineRules.shift()
    let match = rule.re.exec(text.trim())
    if(match) {
      let tokenText = [match[1], match[2], match[0]].find(t => t)
      
      tokens.push({ 
        type: rule.key,
        index: match.index,
        input: match.input,
        text: tokenText,        
        data: { [rule.key]: match[2] } 
      })
      break;
    }
  }

  return tokens
}

function handleMarks(event, change) {  
  let { startBlock } = change.value;
  
  let leaf = startBlock.getLastText().getLeaves().last().toJSON()
  if(!leaf || !leaf.text) return;

  let tokens = applyRules(leaf.text + event.key)
  if(!tokens) return

  let token = tokens[0]
  console.log('token', token)
  //if(token.type == 'text') return;
  if(!token.text) return

  let mark = Mark.create({ type: token.type, data: token.data })
  
  event.preventDefault()
  
  change
    .extend(-1 * token.input.length)
    .delete()
    .insertText(token.text)
    .extend(-1 * token.text.length)
    .addMark(mark)
    .collapseToEnd()
    .insertText(' ')
    .extend(-1)
    .removeMark(mark)
    .collapseToEnd()

  //let { selection } = change.value
  //let range = Range.create({
  //  ...selection.toJSON(),
  //  anchorOffset: selection.anchorOffset - token.text.length,
  //  focusOffset: selection.focusOffset
  //})    

  return true;
}

export default handleMarks;