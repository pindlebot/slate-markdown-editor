// @flow
const curry = require('lodash.curry')
import { Mark } from 'slate';
import insertSpace from './insertSpace'

function insertMark (token, change) {
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

export default curry(insertMark)