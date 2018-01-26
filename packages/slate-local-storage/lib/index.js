'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onKeyDown = onKeyDown;
var debounce = require('lodash.debounce');

var save = exports.save = function save(change, opts) {
  window.localStorage.setItem(opts.key, JSON.stringify(change.value.toJSON()));

  opts.callback();

  return undefined;
};

function onKeyDown(opts, debounced, event, change, editor) {

  return debounced(change, opts);
}

var defaultOpts = exports.defaultOpts = {
  key: '_slate_',
  interval: 1000,
  callback: function callback() {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Saved state 🙌');
    }
  }
};

var load = exports.load = function load(opts) {
  return function () {
    return JSON.parse(window.localStorage.getItem(opts.key));
  };
};

function plugin() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOpts;

  var debounced = debounce(save, opts.interval);

  return {
    onKeyDown: onKeyDown.bind(null, opts, debounced),
    load: load(opts)
  };
}

exports.default = plugin;

exports.plugin = plugin;