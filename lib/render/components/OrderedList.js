import Component from './Component';
const OrderedList = props => {
    let styles = {
        root: {
            'list-style-type': 'none',
            margin: '0 0 0 20px',
            padding: 0,
        }
    };
    return Component(Object.assign({ tagName: 'ol', styles }, props));
};
export default OrderedList;
//# sourceMappingURL=OrderedList.js.map