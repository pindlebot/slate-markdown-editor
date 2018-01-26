import defaultStyles from '../../styles/defaultStyles';
import * as colors from '../../styles/dark';
import Component from './Component';
const Blockquote = props => {
    let styles = {
        root: Object.assign({}, defaultStyles, { margin: '0 0 0 10px', padding: '0 0 0 10px', borderLeft: '2px solid ' + colors.cyan, backgroundColor: colors.lightBlack })
    };
    return Component(Object.assign({ tagName: 'blockquote', styles }, props));
};
export default Blockquote;
//# sourceMappingURL=Blockquote.js.map