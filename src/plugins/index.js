// @flow
import pluginEditBlockquote from '@menubar/slate-edit-blockquote'
import pluginEditList from "@menubar/slate-edit-list";
import pluginEditCode from '@menubar/slate-edit-code'
import pluginPrism from 'slate-prism';
import pluginNoEmpty from 'slate-no-empty'

const isDev = process.env.NODE_ENV !== 'production';

//const pluginInlineMarkdown = isDev ? require('../../packages/slate-inline-markdown').default : 
const pluginInlineMarkdown = require('slate-inline-markdown').default

import pluginLocalStorage from 'slate-local-storage'
import pluginHeading from 'slate-markdown-heading'

import * as options from './options'

export const editBlockquote = pluginEditBlockquote()
export const editList = pluginEditList(options.editListOptions)
export const editCode = pluginEditCode(options.editCodeOptions)
export const prism = pluginPrism()
export const heading = pluginHeading()
export const inlineMarkdown = pluginInlineMarkdown()
export const saveState = pluginLocalStorage(options.localStorageOptions)
export const noEmpty = pluginNoEmpty()

export default [
  editBlockquote,
  editList,
  editCode,
  prism,
  heading,
  inlineMarkdown,
  saveState,
  noEmpty
]