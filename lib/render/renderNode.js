import * as React from 'react';
import * as components from './components';
import * as colors from '../styles/dark';
const blocks = Object.assign({}, components, { unstyled: props => React.createElement("span", Object.assign({}, props.attributes), props.children), code_line: props => (React.createElement("code", Object.assign({}, props.attributes, { style: { display: 'block' } }), props.children)), paragraph: props => React.createElement("p", Object.assign({}, props.attributes), props.children), link: props => (React.createElement("a", Object.assign({ href: props.node.data.get('href'), className: "link", style: { color: colors.blue } }, props.attributes), props.children)) });
export default props => {
    const { node, children, attributes, editor } = props;
    if (blocks[node.type]) {
        return blocks[node.type](props);
    }
    else {
        console.log(`"${node.type}" block type not found.`);
    }
    return null;
};
//# sourceMappingURL=renderNode.js.map