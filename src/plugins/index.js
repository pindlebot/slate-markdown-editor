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

let hasPluginsLocally = process.env.HAS_PLUGINS_LOCALLY

export const editBlockquote = hasPluginsLocally ? require('../packages/@menubar/slate-edit-blockquote/lib').default() : require('@menubar/slate-edit-blockquote').default()

export const editList = hasPluginsLocally ? require('../packages/@menubar/slate-edit-list/lib').default(options.editListOptions) : require('@menubar/slate-edit-list').default(options.editListOptions)

export const editCode = hasPluginsLocally ? require('../packages/@menubar/slate-edit-code/lib').default(options.editCodeOptions) : require('@menubar/slate-edit-code').default(options.editCodeOptions)

export const heading = hasPluginsLocally ? require('../packages/slate-markdown-heading/src').default() : require('slate-markdown-heading').default()

export const inlineMarkdown = hasPluginsLocally ? require('../packages/slate-inline-markdown/src').default() : require('slate-inline-markdown').default()

export const saveState = hasPluginsLocally ? require('../packages/slate-local-storage/src').default() : require('slate-local-storage').default(options.localStorageOptions)

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