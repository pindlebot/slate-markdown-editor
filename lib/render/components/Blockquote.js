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
var Blockquote = function (props) {
    var styles = {
        root: __assign({}, defaultStyles_1.default, { margin: '0 0 0 10px', padding: '0 0 0 10px', borderLeft: '2px solid ' + colors.cyan, backgroundColor: colors.lightBlack })
    };
    return Component_1.default(__assign({ tagName: 'blockquote', styles: styles }, props));
};
exports.default = Blockquote;
//# sourceMappingURL=Blockquote.js.map