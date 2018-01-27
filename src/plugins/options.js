// @flow
import pluginEditCodeOptions from '@menubar/slate-edit-code/dist/options'
import { defaultOpts } from 'slate-local-storage'
import detectIndent from 'detect-indent';

const getIndent = (
  text,
  defaultValue = '  '
) => {
  return detectIndent(text).indent || '  ';
}

export const editCodeOptions = new pluginEditCodeOptions()

export const editListOptions =  {
  types: ['unordered_list', 'ordered_list'],
  typeDefault: 'unstyled'
}

export const LOCAL_STORAGE_KEY = '_slate_'

export const localStorageOptions = {
  ...defaultOpts,
  key: LOCAL_STORAGE_KEY,
}

