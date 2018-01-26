import * as React from 'react';
const pre = {
    backgroundColor: '#fafafa',
    color: '#555',
    fontSize: '14px'
};
export default props => (React.createElement("div", { style: {
        //padding: '6px 0', 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fafafa',
        color: '#555',
        fontSize: '14px'
    } },
    React.createElement("pre", Object.assign({}, props.attributes), props.children),
    React.createElement("div", null,
        React.createElement("div", { style: {
                fontFamily: '"monospace"',
                padding: '2px 10px',
                backgroundColor: '#999',
                color: '#fff'
            } }, props.node.data.get('lang')))));
//# sourceMappingURL=Pre.js.map