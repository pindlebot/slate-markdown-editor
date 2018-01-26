import * as React from "react";
import { Editor, getEventTransfer } from "slate-react";
import * as plugins from './plugins';
import toggleCode from './toggleCode';
import renderNode from './render/renderNode';
import renderMark from './render/renderMark';
import PropTypes from 'prop-types';
const { jss, ThemeProvider } = require('react-jss');
import { getDepth, getPrevious, clear, importMarkdown } from './util';
import Toolbar from './Toolbar';
const slatePlugins = [
    plugins.editCode,
    plugins.editBlockquote,
    plugins.editList,
    plugins.prism,
    plugins.heading,
    plugins.inlineMarkdown,
    plugins.saveState,
    plugins.noEmpty
];
import { isKeyHotkey } from 'is-hotkey';
const isTab = isKeyHotkey('tab');
const isEnter = isKeyHotkey('enter');
const isBackspace = isKeyHotkey('backspace');
class MarkdownEditor extends React.Component {
    constructor() {
        super(...arguments);
        this.onPaste = (event, change) => {
            const transfer = getEventTransfer(event);
            console.log(transfer);
            const value = importMarkdown(transfer.text);
            const { document } = value;
            console.log('pasted', document.toJSON());
            change.insertFragment(document);
            console.log('pasted - result', change.value.toJSON());
            return true;
        };
        this.WrapInBlockquote = (event, change) => {
            event.preventDefault();
            change.call(clear);
            this.props.onChange(plugins.editBlockquote.changes.wrapInBlockquote(change));
            return true;
        };
        this.wrapInList = (type) => {
            return (event, change) => {
                event.preventDefault();
                change.call(clear);
                this.props.onChange(plugins.editList.changes.wrapInList(change, type).focus());
                return true;
            };
        };
        this.onSpace = (event, change) => {
            const { value } = change;
            if (value.isExpanded)
                return;
            const { startBlock, startOffset } = value;
            const chars = startBlock.text;
            //.slice(0, startOffset)
            ///.replace(/\s*/g, '')
            console.log('chars', chars);
            switch (true) {
                case /^\s*[*+-]\s*$/.test(chars):
                    return this.wrapInList('unordered_list')(event, change);
                case /^\s*\d\.\s*$/.test(chars):
                    return this.wrapInList('ordered_list')(event, change);
                case /^\s*>\s*$/.test(chars):
                    return this.WrapInBlockquote(event, change);
                default:
                    return;
            }
        };
        this.onEnter = (event, change) => {
            if (/\s*`{3}.*/.test(change.value.startBlock.text)) {
                return toggleCode(event, change, this.props.onChange);
            }
            let prev = getPrevious(change);
            if (prev &&
                prev.type == 'code_line' &&
                !prev.text &&
                !change.value.startBlock.text) {
                event.preventDefault();
                change.call(clear);
                return toggleCode(event, change, this.props.onChange);
            }
            return;
        };
        this.onKeyDown = (event, change) => {
            if (event.key == ' ')
                return this.onSpace(event, change);
            if (isEnter(event))
                return this.onEnter(event, change);
            if (isTab(event)) {
                event.preventDefault();
                event.stopPropagation();
                if (getDepth(change) <= 1) {
                    return toggleCode(event, change, this.props.onChange);
                }
            }
            return;
        };
    }
    render() {
        const { value } = this.props;
        return (React.createElement("div", null,
            React.createElement(Toolbar, { toolbar: this.props.toolbar }),
            React.createElement(Editor, { placeholder: "Enter some text...", plugins: slatePlugins, value: this.props.value, onChange: this.props.onChange, renderNode: renderNode, renderMark: renderMark, onKeyDown: this.onKeyDown, onPaste: this.onPaste, autoFocus: true })));
    }
}
MarkdownEditor.propTypes = {
    value: PropTypes.object.isRequired,
    toolbar: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};
const theme = {
    backgroundColor: '#fafafa',
    fontFamily: '"Open Sans"'
};
const wrapped = (Component) => {
    class Wrapped extends React.Component {
        render() {
            return (React.createElement(ThemeProvider, { theme: theme },
                React.createElement(Component, Object.assign({}, this.props))));
        }
    }
    return Wrapped;
};
export default wrapped(MarkdownEditor);
//# sourceMappingURL=index.js.map