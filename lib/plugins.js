import pluginEditBlockquote from "slate-edit-blockquote";
import pluginEditList from "slate-edit-list";
import pluginEditCode from "slate-edit-code";
import pluginPrism from 'slate-prism';
import pluginNoEmpty from 'slate-no-empty';
import pluginEditCodeOptions from 'slate-edit-code/dist/options';
import detectIndent from 'detect-indent';
import pluginInlineMarkdown from 'slate-inline-markdown';
import pluginSaveState from 'slate-local-storage';
import pluginHeading from 'slate-markdown-heading';
const getIndent = (text, defaultValue = '  ') => {
    return detectIndent(text).indent || '  ';
};
export const editCodeOptions = new pluginEditCodeOptions();
export const editBlockquote = pluginEditBlockquote();
export const editList = pluginEditList({
    types: ['unordered_list', 'ordered_list'],
    typeDefault: 'unstyled'
});
export const editCode = pluginEditCode(editCodeOptions);
export const prism = pluginPrism();
export const heading = pluginHeading();
export const inlineMarkdown = pluginInlineMarkdown();
export const saveState = pluginSaveState();
export const noEmpty = pluginNoEmpty();
//# sourceMappingURL=plugins.js.map