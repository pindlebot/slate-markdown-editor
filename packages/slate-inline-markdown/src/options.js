import curry from 'lodash.curry'
import inline from 'markup-it/lib/markdown/re/inline'

export const defaultSchema = curry(
  (type, match) => ({
  object: 'mark',
  type: type, 
  input: match.input, 
  text: match[1] || match[2]
  })
)

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

export default {
  rules: inline,
  skip: change => (
    change.value.startBlock.type == 'code_block' || 
    change.value.startBlock.type == 'code_line'
  ),
  keys: [
   ' ' 
  ],
  schema
}