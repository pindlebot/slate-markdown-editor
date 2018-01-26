import Component from './Component';
const UnorderedList = props => {
    let styles = {
        root: {
            'list-style-type': 'none',
            margin: '0 0 0 20px',
            padding: 0,
        }
    };
    return Component(Object.assign({ tagName: 'ul', styles }, props));
};
export default UnorderedList;
//# sourceMappingURL=UnorderedList.js.map