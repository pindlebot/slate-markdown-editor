// @flow
import pluginEditCodeOptions from '@menubar/slate-edit-code/dist/options'
import { defaultOpts } from 'slate-local-storage'
import detectIndent from 'detect-indent';
import { type Node } from 'slate'

const getIndent = (
  text,
  defaultValue = '  '
) => {
  return detectIndent(text).indent || '  ';
}

const editCodeOptions = new pluginEditCodeOptions()

const editListOptions =  {
  types: ['unordered_list', 'ordered_list'],
  typeDefault: 'unstyled'
}

const LOCAL_STORAGE_KEY = '_slate_'

const localStorageOptions = {
  ...defaultOpts,
  key: LOCAL_STORAGE_KEY,
}

const prismOptions = {
  onlyIn: (node: Node) => {
    return node.object === 'block' && node.type === 'code_block';
  }
}

exports.editListOptions = editListOptions;
exports.editCodeOptions = editCodeOptions;
exports.localStorageOptions = localStorageOptions;
exports.prismOptions = prismOptions;
exports.LOCAL_STORAGE_KEY = LOCAL_STORAGE_KEY