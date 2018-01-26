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
var OrderedList = function (props) {
    var styles = {
        root: {
            'list-style-type': 'none',
            margin: '0 0 0 20px',
            padding: 0,
        }
    };
    return Component_1.default(__assign({ tagName: 'ol', styles: styles }, props));
};
exports.default = OrderedList;
//# sourceMappingURL=OrderedList.js.map