// @flow
const curry = require('lodash.curry')
import { type Change } from 'slate'
import inline from './util/inline'

export const defaultSchema = curry(
  (type, match) => ({
    object: 'mark',
    type: type, 
    input: match.input, 
    text: match[1] || match[2]
  })
)

type Match = any

export const schema = {
  text: (match: Match) => defaultSchema('text')(match),
  em: (match: Match) => defaultSchema('em')(match),
  strong: (match: Match) => defaultSchema('strong')(match),
  code: (match: Match) => ({
    object: 'mark',
    type: 'code', 
    input: match.input, 
    text: match[2],
  }),
  link: (match: Match) => ({
    object: 'inline',
    type: 'link', 
    input: match.input, 
    text: match[1] || match[2],
    data: { 
      href: match[2], 
      title: match[1] || match[3], 
    }
  }),
  image: (match: Match) => ({
    object: 'inline',
    type: 'image',
    input: match.input, 
    text: match[1] || match[2],
    data: { 
      alt: match[1],
      src: match[2],
      title: match[3]
    }
  })
}

export default {
  rules: inline,
  skip: (change: Change) => (
    change.value.startBlock.type == 'code_block' || 
    change.value.startBlock.type == 'code_line'
  ),
  keys: [
   ' ' 
  ],
  schema
}