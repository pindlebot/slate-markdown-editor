import * as React from 'react';
function renderMark(props) {
    let marks = {
        strong: props => React.createElement("strong", null, props.children),
        em: props => React.createElement("em", null, props.children),
        text: props => React.createElement("span", null, props.children),
        code: props => React.createElement("code", null, props.children),
        link: props => (React.createElement("a", { style: { color: 'blue' }, href: props.mark.data.get('link') }, props.children))
    };
    let mark = marks[props.mark.type];
    if (mark)
        return mark(props);
    return null;
}
export default renderMark;
//# sourceMappingURL=renderMark.js.map