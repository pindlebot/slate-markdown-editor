import * as React from 'react';
const styles = {
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
};
let Toolbar = props => (React.createElement("div", { style: styles.root }, props.toolbar));
export default Toolbar;
//# sourceMappingURL=index.js.map