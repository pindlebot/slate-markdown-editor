const curry = require('lodash.curry')
const inlineRegEx = require('markup-it/lib/markdown/re/inline')
const { Range, Mark } = require('slate')

let rules = Object.keys(inlineRegEx)
  .map(key => ({
    key, 
    re: inlineRegEx[key]
  })
)

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

    if(!match) continue;
    if(!schema[rule.key]) {
      console.log(rule.key + ' not found!')
      continue
    }
  
    let tok = schema[rule.key](match)
    if(tok) tokens.push(tok)
    break;
  }

  return tokens
}

const insertSpace = change => change.collapseToEnd().insertText(' ')

let insertMark = (token, change) => {
  let mark = Mark.create({ 
    type: token.type, 
    data: token.data 
  })
  
  change
    .addMark(mark)
    .call(insertSpace)
    .extend(-1)
    .removeMark(mark)
    .collapseToEnd() 
}

let replaceText = (token, change) => {
  change
    .extend(-1 * token.input.length)
    .delete()
    .insertText(token.text)
    .extend(-1 * token.text.length)
}

insertMark = curry(insertMark)
replaceText = curry(replaceText)

function onSpace(opts, event, change, editor) {  
  let { startBlock } = change.value;
  if(
    startBlock.type == 'code_block' || 
    startBlock.type == 'code_line'
  ) return;

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

  change.call(replaceText(token))
  
  if(token.object == 'mark') {
    change.call(insertMark(token))
  
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

function onKeyDown(
  opts,
  event,
  change,
  editor,
) {
  const args = [opts, event, change, editor];
  if (event.key == ' ') return onSpace(...args)
  return undefined;
} 

function core(opts = {}) {
  return {
    onKeyDown: onKeyDown.bind(null, opts)
  }
}

export default core;