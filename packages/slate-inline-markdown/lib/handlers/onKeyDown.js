'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onKeyDown;

var _changes = require('../changes');

var changes = _interopRequireWildcard(_changes);

var _util = require('../util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function handle(opts, event, change, editor) {
  var startBlock = change.value.startBlock;

  if (opts.skip(change)) return;

  var text = (0, _util.getLastText)(change);
  if (!text) return;

  var tokens = (0, _util.applyRules)(opts.rules, opts.schema)(text + event.key);

  if (!tokens || !tokens.length || !tokens[0].text) return;

  var token = tokens[0];

  event.preventDefault();

  change.call(changes.replaceText(token));

  if (token.object == 'mark') {
    change.call(changes.insertMark(token));

    return true;
  } else if (token.object == 'inline') {
    change.wrapInline({
      type: 'link',
      data: token.data
    }).call(changes.insertSpace);

    return true;
  }
}

function onKeyDown(opts, event, change, editor) {
  var args = [opts, event, change, editor];

  if (opts.keys.indexOf(event.key) > -1) return handle.apply(undefined, args);
  return undefined;
}