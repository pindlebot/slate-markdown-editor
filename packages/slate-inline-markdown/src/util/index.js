const curry = require('lodash.curry')

export const getLastText = change => change.value.startBlock
  .getLastText().getLeaves().last().get('text')

export const applyRules = curry(
  (rules, schema, text) => {
    let tokens = []
    
    for(let key in rules) {
      let match = rules[key].exec(text.trim())
      if(!match) continue;
      if(!schema[key]) {
        console.warn(key + ' not found!')
        continue
      }
      let tok = schema[key](match)
      if(tok) tokens.push(tok)
      break;
    }

    return tokens;
  }
)

