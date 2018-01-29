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

export const editBlockquote = require('../packages/@menubar/slate-edit-blockquote/lib').default()

export const editList = require('../packages/@menubar/slate-edit-list/lib').default(options.editListOptions)

export const editCode = require('../packages/@menubar/slate-edit-code/lib').default(options.editCodeOptions)

export const heading = require('../packages/slate-markdown-heading/src').default()

export const inlineMarkdown = require('../packages/slate-inline-markdown/src').default()

export const saveState = require('../packages/slate-local-storage/src').default()

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