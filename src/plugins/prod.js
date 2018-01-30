import * as options from './options'

import slatePrism from 'slate-prism';
import slateNoEmpty from 'slate-no-empty'
import slatePluginHandler from './pluginHandler'
import slateEditBlockquote from '@menubar/slate-edit-blockquote'
import slateEditList from '@menubar/slate-edit-list'
import slateEditCode from '@menubar/slate-edit-code'
import slateMarkdownHeading from 'slate-markdown-heading'
import slateInlineMarkdown from 'slate-inline-markdown'
import slateLocalStorage from 'slate-local-storage'

const noEmpty = slateNoEmpty()
noEmpty.name = 'slate_no_empty'
noEmpty.options = undefined;

const prism = slatePrism(options.prismOptions)
prism.name = 'slate_prism'
prism.options = options.prismOptions;

const editBlockquote = slateEditBlockquote()
editBlockquote.name = 'slate_edit_blockquote'
editBlockquote.options = undefined;

const editList = slateEditList(options.editListOptions)
editList.name = 'slate_edit_list'
editList.options = options.editListOptions

const editCode = slateEditCode(options.editCodeOptions)
editCode.name = 'slate_edit_code'
editCode.options = options.editCodeOptions

const heading = slateMarkdownHeading()
heading.name = 'slate_markdown_heading'
heading.options = undefined;

const inlineMarkdown = slateInlineMarkdown()
inlineMarkdown.name = 'slate_inline_markdown'
inlineMarkdown.options = undefined;

const saveState = slateLocalStorage(options.localStorageOptions)
saveState.name = 'slate_local_storage'
saveState.options = options.localStorageOptions;

const handler = slatePluginHandler()
handler.name = 'slate_plugin_handler'
handler.options = undefined;

export default [
  handler,
  editBlockquote,
  editList,
  editCode,
  prism,
  heading,
  inlineMarkdown,
  saveState,
  noEmpty
]

exports.noEmpty = noEmpty;
exports.prism = prism;
exports.editBlockquote = editBlockquote;
exports.editList = editList;
exports.editCode = editCode;
exports.heading = heading;
exports.inlineMarkdown = inlineMarkdown;
exports.saveState = saveState;
exports.handler = handler;