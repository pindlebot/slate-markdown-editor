const path = require('path')
const fs = require('fs')
import pluginPrism from 'slate-prism';
import pluginNoEmpty from 'slate-no-empty'

import * as options from './options'

const prismOpts = {
  onlyIn: (node) => {
    return node.object === 'block' && node.type === 'code_block';
  }
}
export const noEmpty = pluginNoEmpty()
export const prism = pluginPrism(prismOpts)

export const editBlockquote = require('@menubar/slate-edit-blockquote').default()

export const editList = require('@menubar/slate-edit-list').default(options.editListOptions)

export const editCode = require('@menubar/slate-edit-code').default(options.editCodeOptions)

export const heading = require('slate-markdown-heading').default()

export const inlineMarkdown = require('slate-inline-markdown').default()

export const saveState = require('slate-local-storage').default(options.localStorageOptions)

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