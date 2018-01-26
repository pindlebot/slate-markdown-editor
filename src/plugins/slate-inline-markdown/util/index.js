import curry from 'lodash.curry'

let defaultSchema = (type, match) => ({
  object: 'mark',
  type: type, 
  input: match.input, 
  text: match[1] || match[2]
})

defaultSchema = curry(defaultSchema)

export const schema = {
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

export function applyRules(rules, text) {
  let tokens = []
  
  for(let key in rules) {
    let match = rules[key].exec(text.trim())
    if(!match) continue;
    if(!schema[key]) {
      console.log(key + ' not found!')
      continue
    }
    let tok = schema[key](match)
    if(tok) tokens.push(tok)
    break;
  }

  return tokens;
}