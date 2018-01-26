'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.defaultSchema = undefined;

var _lodash = require('lodash.curry');

var _lodash2 = _interopRequireDefault(_lodash);

var _inline = require('markup-it/lib/markdown/re/inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultSchema = exports.defaultSchema = (0, _lodash2.default)(function (type, match) {
  return {
    object: 'mark',
    type: type,
    input: match.input,
    text: match[1] || match[2]
  };
});

var schema = exports.schema = {
  text: function text(match) {
    return defaultSchema('text')(match);
  },
  em: function em(match) {
    return defaultSchema('em')(match);
  },
  strong: function strong(match) {
    return defaultSchema('strong')(match);
  },
  code: function code(match) {
    return {
      object: 'mark',
      type: 'code',
      input: match.input,
      text: match[2]
    };
  },
  link: function link(match) {
    return {
      object: 'inline',
      type: 'link',
      input: match.input,
      text: match[1] || match[2],
      data: { href: match[2] }
    };
  }
};

exports.default = {
  rules: _inline2.default,
  skip: function skip(change) {
    return change.value.startBlock.type == 'code_block' || change.value.startBlock.type == 'code_line';
  },
  keys: [' '],
  schema: schema
};