import Component from './Component';
import * as colors from '../../styles/dark';
const CodeBlock = props => {
    let { parent: { nodes } } = props;
    let styles = {
        root: {
            backgroundColor: `${colors.borderColor} !important`,
            borderRadius: 0,
            '&:before': {
                content: '"```"',
                color: colors.foregroundColor,
                verticalAlign: 'top',
            },
            '&:after': {
                content: '"```"',
                verticalAlign: 'bottom',
                color: colors.foregroundColor,
                lineHeight: 0,
            },
        }
    };
    let syntax = props.node.data.get('syntax');
    let attributes = Object.assign({}, props.attributes, { 'data-syntax': syntax });
    return Component(Object.assign({ tagName: 'pre', className: syntax, styles,
        attributes }, props));
};
export default CodeBlock;
//# sourceMappingURL=CodeBlock.js.map