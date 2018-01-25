import pluginEditBlockquote from "slate-edit-blockquote";
import pluginEditList from "slate-edit-list";
import pluginEditCode from "slate-edit-code";
import pluginPrism from 'slate-prism';

import pluginEditCodeOptions from 'slate-edit-code/dist/options'

import detectIndent from 'detect-indent';
import pluginHeading from './heading'
import pluginInlineMarkdown from './inlineMarkdown'

const getIndent = (
  text,
  defaultValue = '  '
) => {
  return detectIndent(text).indent || '  ';
}

export const editCodeOptions = new pluginEditCodeOptions()
export const editBlockquote = pluginEditBlockquote()
export const editList = pluginEditList({
  types: ['unordered_list', 'ordered_list']
})
export const editCode = pluginEditCode(editCodeOptions)
export const prism = pluginPrism()
export const heading = pluginHeading()
export const inlineMarkdown = pluginInlineMarkdown()