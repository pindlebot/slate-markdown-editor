'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (change) {
  return change.collapseToEnd().insertText(' ');
};