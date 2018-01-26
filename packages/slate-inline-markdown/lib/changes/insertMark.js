'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slate = require('slate');

var _lodash = require('lodash.curry');

var _lodash2 = _interopRequireDefault(_lodash);

var _insertSpace = require('./insertSpace');

var _insertSpace2 = _interopRequireDefault(_insertSpace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function insertMark(token, change) {
  var mark = _slate.Mark.create({
    type: token.type,
    data: token.data
  });

  change.addMark(mark).call(_insertSpace2.default).extend(-1).removeMark(mark).collapseToEnd();
}

exports.default = (0, _lodash2.default)(insertMark);