'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyRules = exports.getLastText = undefined;

var _lodash = require('lodash.curry');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getLastText = exports.getLastText = function getLastText(change) {
  return change.value.startBlock.getLastText().getLeaves().last().get('text');
};

var applyRules = exports.applyRules = (0, _lodash2.default)(function (rules, schema, text) {
  var tokens = [];

  for (var key in rules) {
    var match = rules[key].exec(text.trim());
    if (!match) continue;
    if (!schema[key]) {
      console.log(key + ' not found!');
      continue;
    }
    var tok = schema[key](match);
    if (tok) tokens.push(tok);
    break;
  }

  return tokens;
});