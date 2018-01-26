'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isHotkey = require('is-hotkey');

var HEADING_RE = require('markup-it/lib/markdown/re/heading');

var isTab = (0, _isHotkey.isKeyHotkey)('tab');
var isEnter = (0, _isHotkey.isKeyHotkey)('enter');
var isBackspace = (0, _isHotkey.isKeyHotkey)('backspace');

var isHeading = function isHeading(opts, change) {
  return opts.blocks.indexOf(change.value.startBlock.type) > -1;
};

function onSpace(opts, event, change, editor) {
  var startBlock = change.value.startBlock;
  var text = startBlock.text;


  if (!opts.re.test(text)) return undefined;

  var matches = opts.re.exec(text);
  var depth = (matches[1] || matches[0]).length;
  var data = { depth: depth };

  if (opts.clear) {
    change.extendToStartOf(startBlock).delete();
  }
  var type = opts.blocks[depth - 1];
  if (!type) return;
  change.setBlock({ type: type, data: data });

  return true;
}

function onEnter(opts, event, change, editor) {
  var startBlock = change.value.startBlock;


  if (!isHeading(opts, change)) return;

  event.preventDefault();

  change.splitBlock().setBlock(opts.defaultBlock);

  return true;
}

function onBackspace(opts, event, change, editor) {
  var startBlock = change.value.startBlock;


  if (!isHeading(opts, change)) return;
  if (startBlock.text.length !== 0) return;

  event.preventDefault();

  change.setBlock(opts.defaultBlock);

  return true;
}

function onKeyDown(opts, event, change, editor) {
  var args = [opts, event, change, editor];

  if (event.key == ' ') return onSpace.apply(undefined, args);else if (isEnter(event)) return onEnter.apply(undefined, args);else if (isBackspace(event)) return onBackspace.apply(undefined, args);
  return undefined;
}

var defaultOpts = {
  defaultBlock: 'paragraph',
  blocks: ['header_one', 'header_two', 'header_three', 'header_four', 'header_five', 'header_six'],
  clear: true,
  re: HEADING_RE.normal
};

function core() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOpts;

  return {
    onKeyDown: onKeyDown.bind(null, opts),
    schema: {
      normalize: function normalize(change, reason, context) {
        if (reason == 'child_type_invalid') {
          change.setNodeByKey(context.child.key, { type: 'paragraph' });
        }
      }
    }
  };
}

exports.default = core;