const inline = require('markup-it/lib/markdown/re/inline')
const block = require('markup-it/lib/markdown/re/block')
const curry = require('lodash.curry')

const toArr = obj => Object.keys(obj)
  .map(key => ({
    key, 
    value: obj[key]
  })
)

//block.list = toArr(block.list)

let listRe = block.list.block;

let defaultSchema = (type, match) => ({
  object: 'mark',
  type: type, 
  input: match.input, 
  text: match[1] || match[2]
})

let applyRules = (object, text) => {
  let type;

  switch(true) {
    case /[*+-]/.test(text):
      type = 'unordered_list';
      break;
    case /\d+\./.test(text):
      type = 'ordered_list';
      break;
    case /#{1,6}/.test(text):
      let depth = /#{1,6}/.exec(text)[0].length;
      type = 'header_' + depth;
      break;
    case /`{3}/.test(text): 
      type = 'code_block'
      break;
    case />/.test(text):
      type = 'blockquote';
      break;
    default:
      type = 'paragraph'
  }

  return type
}

applyRules = curry(applyRules)

let out = applyRules('block')('## ok')
console.log(out)