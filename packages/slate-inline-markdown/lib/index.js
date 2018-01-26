'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _onKeyDown = require('./handlers/onKeyDown');

var _onKeyDown2 = _interopRequireDefault(_onKeyDown);

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function plugin() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _options2.default;

  return {
    onKeyDown: _onKeyDown2.default.bind(null, opts)
  };
}

exports.plugin = plugin;
exports.default = plugin;