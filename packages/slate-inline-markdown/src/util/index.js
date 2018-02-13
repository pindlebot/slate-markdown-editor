const curry = require('lodash.curry')

export const getLastText = change => change.value.startBlock
  .getLastText().getLeaves().last().get('text')

export function isImage (raw) {
  return raw.charAt(0) === '!'
}

export const applyRules = curry(
  (rules, schema, text) => {
    let tokens = []

    for (let key in rules) {
      let match = rules[key].exec(text.trim())
      if (!match) continue
      if (!schema[key]) {
        console.warn(key + ' not found!')
        continue
      }
      if (isImage(text)) {
        key = 'image'
      }
      let tok = schema[key](match)
      if (tok) tokens.push(tok)
      break
    }

    return tokens
  }
)

export function replace (regex, opt) {
  regex = regex.source
  opt = opt || ''

  return function self (name, val) {
    if (!name) return new RegExp(regex, opt)
    val = val.source || val
    val = val.replace(/(^|[^\[])\^/g, '$1')
    regex = regex.replace(name, val)
    return self
  }
}
