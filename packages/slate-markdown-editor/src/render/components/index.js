// @flow
import CodeBlock from './CodeBlock'
import ListItem from './ListItem'
import Heading from './Heading'
import Html from './Html'
import Script from './Script'
import Gist from './Gist'
import Component from './Component'

export const elementNames = {
  code_line: 'code',
  code_block: 'pre',
  blockquote: 'blockquote',
  link: 'a',
  ordered_list: 'ol',
  unordered_list: 'ul',
  list_item: 'li',
  paragraph: 'div',
  unstyled: 'div',
  image: 'img'
}

export const themeKeyToElementName = name =>
  elementNames.hasOwnProperty(name)
    ? elementNames[name]
    : name

const defaultComponent = name =>
  Component(theme => theme[name])(themeKeyToElementName(name))

exports.blockquote = defaultComponent('blockquote')
exports.ordered_list = defaultComponent('ordered_list')
exports.code_line = defaultComponent('code_line')
exports.paragraph = defaultComponent('paragraph')
exports.unstyled = defaultComponent('unstyled')
exports.link = defaultComponent('link')
exports.unordered_list = defaultComponent('unordered_list')
exports.image = defaultComponent('image')

exports.code_block = CodeBlock
exports.list_item = ListItem
exports.html = Html
exports.htmlTagPair = Html
exports.htmlSelfClosingTag = Html
exports.script = Script
exports.gist = Gist
exports.header_one = Heading(1)
exports.header_two = Heading(2)
exports.header_three = Heading(3)
exports.header_four = Heading(4)
exports.header_five = Heading(5)
exports.header_six = Heading(6)
