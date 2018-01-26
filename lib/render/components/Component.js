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
var react_jss_1 = require("react-jss");
var Component = function (props) {
    var classes = [props.classes.root];
    if (props.className)
        classes.push(props.className);
    return React.createElement(props.tagName, __assign({ className: classes.join(' ') }, props.attributes), props.children);
};
exports.default = function (props) {
    var WrappedComponent = react_jss_1.default(props.styles)(Component);
    return React.createElement(WrappedComponent, __assign({}, props));
};
//# sourceMappingURL=Component.js.map