import defaultStyles from '../../styles/defaultStyles';
import * as colors from '../../styles/dark';
import Component from './Component';
import * as plugins from '../../plugins';
const ListItem = props => {
    let { attributes, children, node, editor, parent } = props;
    const isCurrentItem = plugins.editList.utils
        .getItemsAtRange(editor.value)
        .contains(node);
    let key = node.get('key');
    let index = parent.nodes.map(node => node.get('key')).indexOf(key);
    //let depth = editor.props.value.document.getDepth(node.key)
    //console.log(depth)
    let className = isCurrentItem ? 'current-item' : undefined;
    let prefix = props.parent.type === 'unordered_list' ?
        '-' : index + 1 + '.';
    let styles = {
        root: Object.assign({}, defaultStyles, { '&:before': {
                content: `"${prefix} "`,
                color: colors.magenta,
            }, '& p': {
                display: 'inline-block',
                marginBottom: 0
            } })
    };
    return Component(Object.assign({ tagName: 'li', styles, className }, props));
};
export default ListItem;
//# sourceMappingURL=ListItem.js.map