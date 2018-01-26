import pluginEditCodeOptions from '@menubar/slate-edit-code/dist/options'
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