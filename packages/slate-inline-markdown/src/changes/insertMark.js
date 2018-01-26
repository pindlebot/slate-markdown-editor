import { Mark } from 'slate';
import * as curry from 'lodash.curry'
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