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
var Component_1 = require("./Component");
var colors = require("../../styles/dark");
var CodeBlock = function (props) {
    var nodes = props.parent.nodes;
    var styles = {
        root: {
            backgroundColor: colors.borderColor + " !important",
            borderRadius: 0,
            '&:before': {
                content: '"```"',
                color: colors.foregroundColor,
                verticalAlign: 'top',
            },
            '&:after': {
                content: '"```"',
                verticalAlign: 'bottom',
                color: colors.foregroundColor,
                lineHeight: 0,
            },
        }
    };
    var syntax = props.node.data.get('syntax');
    var attributes = __assign({}, props.attributes, { 'data-syntax': syntax });
    return Component_1.default(__assign({ tagName: 'pre', className: syntax, styles: styles,
        attributes: attributes }, props));
};
exports.default = CodeBlock;
//# sourceMappingURL=CodeBlock.js.map