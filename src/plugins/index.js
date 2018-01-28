const path = require('path')
import pluginPrism from 'slate-prism';
import pluginNoEmpty from 'slate-no-empty'

const isDev = process.env.NODE_ENV !== 'production'

import * as options from './options'

export const noEmpty = pluginNoEmpty()
export const prism = pluginPrism()

export const editBlockquote = isDev ? require('../packages/@menubar/slate-edit-blockquote').default() : require('@menubar/slate-edit-blockquote').default()

export const editList = isDev ? require('../packages/@menubar/slate-edit-list').default(options.editListOptions) : require('@menubar/slate-edit-list').default(options.editListOptions)

export const editCode = isDev ? require('../packages/@menubar/slate-edit-code').default(options.editCodeOptions) : require('@menubar/slate-edit-code').default(options.editCodeOptions)

export const heading = isDev ? require('../packages/slate-markdown-heading').default() : require('slate-markdown-heading').default()

export const inlineMarkdown = isDev ? require('../packages/slate-inline-markdown').default() : require('slate-inline-markdown').default()

export const saveState = isDev ? require('../packages/slate-local-storage').default() : require('slate-local-storage').default(options.localStorageOptions)

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