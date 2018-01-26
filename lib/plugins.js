"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slate_edit_blockquote_1 = require("slate-edit-blockquote");
var slate_edit_list_1 = require("slate-edit-list");
var slate_edit_code_1 = require("slate-edit-code");
var slate_prism_1 = require("slate-prism");
var slate_no_empty_1 = require("slate-no-empty");
var options_1 = require("slate-edit-code/dist/options");
var detect_indent_1 = require("detect-indent");
var slate_inline_markdown_1 = require("slate-inline-markdown");
var slate_local_storage_1 = require("slate-local-storage");
var slate_markdown_heading_1 = require("slate-markdown-heading");
var getIndent = function (text, defaultValue) {
    if (defaultValue === void 0) { defaultValue = '  '; }
    return detect_indent_1.default(text).indent || '  ';
};
exports.editCodeOptions = new options_1.default();
exports.editBlockquote = slate_edit_blockquote_1.default();
exports.editList = slate_edit_list_1.default({
    types: ['unordered_list', 'ordered_list'],
    typeDefault: 'unstyled'
});
exports.editCode = slate_edit_code_1.default(exports.editCodeOptions);
exports.prism = slate_prism_1.default();
exports.heading = slate_markdown_heading_1.default();
exports.inlineMarkdown = slate_inline_markdown_1.default();
exports.saveState = slate_local_storage_1.default();
exports.noEmpty = slate_no_empty_1.default();
//# sourceMappingURL=plugins.js.map