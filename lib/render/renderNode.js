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
var React = require("react");
var components = require("./components");
var colors = require("../styles/dark");
var blocks = __assign({}, components, { unstyled: function (props) { return React.createElement("span", __assign({}, props.attributes), props.children); }, code_line: function (props) { return (React.createElement("code", __assign({}, props.attributes, { style: { display: 'block' } }), props.children)); }, paragraph: function (props) { return React.createElement("p", __assign({}, props.attributes), props.children); }, link: function (props) { return (React.createElement("a", __assign({ href: props.node.data.get('href'), className: "link", style: { color: colors.blue } }, props.attributes), props.children)); } });
exports.default = function (props) {
    var node = props.node, children = props.children, attributes = props.attributes, editor = props.editor;
    if (blocks[node.type]) {
        return blocks[node.type](props);
    }
    else {
        console.log("\"" + node.type + "\" block type not found.");
    }
    return null;
};
//# sourceMappingURL=renderNode.js.map