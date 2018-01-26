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
var Heading = function (depth) {
    return function (props) {
        var attributes = props.attributes, node = props.node, parent = props.parent;
        var tagName = 'h' + depth;
        var content = '#'.repeat(depth) + ' ';
        var styles = {
            root: __assign({}, defaultStyles_1.default, { display: parent.get('type') === 'list_item' ? 'inline-block' : 'block', '&:before': {
                    content: "\"" + content + "\"",
                    color: colors.yellow
                } })
        };
        if (parent.get('type') === 'list_item') {
            styles.root.marginTop = 0;
        }
        return Component_1.default(__assign({ tagName: tagName, styles: styles }, props));
    };
};
exports.default = Heading;
//# sourceMappingURL=Heading.js.map