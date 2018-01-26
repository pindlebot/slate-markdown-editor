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
var pre = {
    backgroundColor: '#fafafa',
    color: '#555',
    fontSize: '14px'
};
exports.default = function (props) { return (React.createElement("div", { style: {
        //padding: '6px 0', 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fafafa',
        color: '#555',
        fontSize: '14px'
    } },
    React.createElement("pre", __assign({}, props.attributes), props.children),
    React.createElement("div", null,
        React.createElement("div", { style: {
                fontFamily: '"monospace"',
                padding: '2px 10px',
                backgroundColor: '#999',
                color: '#fff'
            } }, props.node.data.get('lang'))))); };
//# sourceMappingURL=Pre.js.map