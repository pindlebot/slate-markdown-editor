// @flow
import CodeBlock from './CodeBlock'
import ListItem from './ListItem'
import Heading from './Heading'
import Html from './Html'
import Script from './Script'
import Gist from './Gist'
import { defaultComponent } from './Component'

export const blockquote = defaultComponent('blockquote')
export const ordered_list = defaultComponent('ordered_list')
export const code_line = defaultComponent('code_line')
export const paragraph = defaultComponent('paragraph')
export const unstyled = defaultComponent('unstyled')
export const link = defaultComponent('link')
export const unordered_list = defaultComponent('unordered_list')
export const image = defaultComponent('image')

export const header_one = Heading(1)
export const header_two = Heading(2)
export const header_three = Heading(3)
export const header_four = Heading(4)
export const header_five = Heading(5)
export const header_six = Heading(6)

export const code_block = CodeBlock
export const list_item = ListItem
export const html = Html
export const htmlTagPair = Html
export const htmlSelfClosingTag = Html
export const script = Script
export const gist = Gist

export default {
  blockquote,
  ordered_list,
  code_line,
  paragraph,
  unstyled,
  link,
  unordered_list,
  image,
  code_block,
  list_item,
  html,
  htmlTagPair,
  htmlSelfClosingTag,
  script,
  gist,
  header_one,
  header_two,
  header_three,
  header_four,
  header_five,
  header_six
}