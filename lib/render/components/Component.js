import * as React from 'react';
import injectSheet from 'react-jss';
const Component = props => {
    let classes = [props.classes.root];
    if (props.className)
        classes.push(props.className);
    return React.createElement(props.tagName, Object.assign({ className: classes.join(' ') }, props.attributes), props.children);
};
export default props => {
    let WrappedComponent = injectSheet(props.styles)(Component);
    return React.createElement(WrappedComponent, Object.assign({}, props));
};
//# sourceMappingURL=Component.js.map