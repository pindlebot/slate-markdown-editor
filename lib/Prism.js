"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prismjs = require("prismjs");

var _prismjs2 = _interopRequireDefault(_prismjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_prismjs2.default.languages.markdown = _prismjs2.default.languages.extend("markup", {});

_prismjs2.default.languages.insertBefore("markdown", "prolog", {
  blockquote: {
    pattern: /^>(?:[\t ]*>)*/m,
    alias: "punctuation"
  },
  code: [{ pattern: /^(?: {4}|\t).+/m, alias: "keyword" }, { pattern: /``.+?``|`[^`\n]+`/, alias: "keyword" }],
  title: [{
    pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
    alias: "important",
    inside: { punctuation: /==+$|--+$/ }
  }, {
    pattern: /(^\s*)#+.+/m,
    lookbehind: !0,
    alias: "important",
    inside: { punctuation: /^#+|#+$/ }
  }],
  hr: {
    pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
    lookbehind: !0,
    alias: "punctuation"
  },
  list: {
    pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
    lookbehind: !0,
    alias: "punctuation"
  },
  "url-reference": {
    pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
    inside: {
      variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
      string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
      punctuation: /^[\[\]!:]|[<>]/
    },
    alias: "url"
  },
  bold: {
    pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: { punctuation: /^\*\*|^__|\*\*$|__$/ }
  },
  italic: {
    pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: { punctuation: /^[*_]|[*_]$/ }
  },
  url: {
    pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
    inside: {
      variable: {
        pattern: /(!?\[)[^\]]+(?=\]$)/,
        lookbehind: !0
      },
      string: {
        pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
      }
    }
  }
});

_prismjs2.default.languages.markdown.bold.inside.url = _prismjs2.default.util.clone(_prismjs2.default.languages.markdown.url);

_prismjs2.default.languages.markdown.italic.inside.url = _prismjs2.default.util.clone(_prismjs2.default.languages.markdown.url);

_prismjs2.default.languages.markdown.bold.inside.italic = _prismjs2.default.util.clone(_prismjs2.default.languages.markdown.italic);

_prismjs2.default.languages.markdown.italic.inside.bold = _prismjs2.default.util.clone(_prismjs2.default.languages.markdown.bold);

exports.default = _prismjs2.default;