"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultStyles_1 = require("../../styles/defaultStyles");
var colors = require("../../styles/dark");
var Component_1 = require("./Component");
var plugins = require("../../plugins");
var ListItem = function (props) {
    var attributes = props.attributes, children = props.children, node = props.node, editor = props.editor, parent = props.parent;
    var isCurrentItem = plugins.editList.utils
        .getItemsAtRange(editor.value)
        .contains(node);
    var key = node.get('key');
    var index = parent.nodes.map(function (node) { return node.get('key'); }).indexOf(key);
    //let depth = editor.props.value.document.getDepth(node.key)
    //console.log(depth)
    var className = isCurrentItem ? 'current-item' : undefined;
    var prefix = props.parent.type === 'unordered_list' ?
        '-' : index + 1 + '.';
    var styles = {
        root: __assign({}, defaultStyles_1.default, { '&:before': {
                content: "\"" + prefix + " \"",
                color: colors.magenta,
            }, '& p': {
                display: 'inline-block',
                marginBottom: 0
            } })
    };
    return Component_1.default(__assign({ tagName: 'li', styles: styles, className: className }, props));
};
exports.default = ListItem;
//# sourceMappingURL=ListItem.js.map