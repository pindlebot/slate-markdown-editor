"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function renderMark(props) {
    var marks = {
        strong: function (props) { return React.createElement("strong", null, props.children); },
        em: function (props) { return React.createElement("em", null, props.children); },
        text: function (props) { return React.createElement("span", null, props.children); },
        code: function (props) { return React.createElement("code", null, props.children); },
        link: function (props) { return (React.createElement("a", { style: { color: 'blue' }, href: props.mark.data.get('link') }, props.children)); }
    };
    var mark = marks[props.mark.type];
    if (mark)
        return mark(props);
    return null;
}
exports.default = renderMark;
//# sourceMappingURL=renderMark.js.map