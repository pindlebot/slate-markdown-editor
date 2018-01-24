
const wrap = require('lodash.wrap')
const curry = require('lodash.curry')
const { State } = require('markup-it');
const inlineRe = require('markup-it/lib/markdown/re/inline')
const { Range, Mark } = require('slate')

let rules = Object.keys(inlineRe).map(key => ({key, re: inlineRe[key]}))

let defaultSchema = (type, match) => ({
  object: 'mark',
  type: type, 
  input: match.input, 
  text: match[1] || match[2]
})

defaultSchema = curry(defaultSchema)

const schema = {
  text: match => defaultSchema('text')(match),
  em: match => defaultSchema('em')(match),
  strong: match => defaultSchema('strong')(match),
  code: match => ({
    object: 'mark',
    type: 'code', 
    input: match.input, 
    text: match[2],
  }),
  link: match => ({
    object: 'inline',
    type: 'link', 
    input: match.input, 
    text: match[1] || match[2],
    data: { href: match[2] }
  })
}

function applyRules(text) {
  let tokens = []
  let inlineRules = [...rules]

  while (inlineRules.length) {
    let rule = inlineRules.shift()
    let match = rule.re.exec(text.trim())
    if(match) {
      let tok = schema[rule.key](match)
      console.log('match', match)
      console.log(tok)      
      if(tok) tokens.push(tok)
      break;
    }
  }

  return tokens
}

const insertSpace = change => change.collapseToEnd().insertText(' ')

function handleMarks(event, change) {  
  let { startBlock } = change.value;
  if(
    startBlock.type == 'code_block' || 
    startBlock.type == 'code_line'
  ) return;

  let leaf = startBlock.getLastText().getLeaves().last().toJSON()
  if(!leaf || !leaf.text) return;

  let tokens = applyRules(leaf.text + event.key)
  if(!tokens) return

  let token = tokens[0]

  if(!token.text) return
  event.preventDefault()
  
  change
    .extend(-1 * token.input.length)
    .delete()
    .insertText(token.text)
    .extend(-1 * token.text.length)

  if(token.object == 'mark') {
    let mark = Mark.create({ type: token.type, data: token.data })
        
    change
      .addMark(mark)
      .call(insertSpace)
      .extend(-1)
      .removeMark(mark)
      .collapseToEnd() 
  
    return true;
  } else if(token.object == 'inline') {
    change
      .wrapInline({
        type: 'link',
        data: token.data
      })
      .call(insertSpace)
      
    return true;
  }
}

export default handleMarks;