const inlineRegEx = require('markup-it/lib/markdown/re/inline')

export default {
  re: inlineRegEx,
  skip: change => (
    change.value.startBlock.type == 'code_block' || 
    change.value.startBlock.type == 'code_line'
  )
}