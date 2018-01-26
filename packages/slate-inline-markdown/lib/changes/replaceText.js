'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.curry');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function replaceText(token, change) {
  change.extend(-1 * token.input.length).delete().insertText(token.text).extend(-1 * token.text.length);
}

exports.default = (0, _lodash2.default)(replaceText);