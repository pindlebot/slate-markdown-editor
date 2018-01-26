"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var slate_react_1 = require("slate-react");
var plugins = require("./plugins");
var toggleCode_1 = require("./toggleCode");
var renderNode_1 = require("./render/renderNode");
var renderMark_1 = require("./render/renderMark");
var prop_types_1 = require("prop-types");
var _a = require('react-jss'), jss = _a.jss, ThemeProvider = _a.ThemeProvider;
var util_1 = require("./util");
var Toolbar_1 = require("./Toolbar");
var slatePlugins = [
    plugins.editCode,
    plugins.editBlockquote,
    plugins.editList,
    plugins.prism,
    plugins.heading,
    plugins.inlineMarkdown,
    plugins.saveState,
    plugins.noEmpty
];
var is_hotkey_1 = require("is-hotkey");
var isTab = is_hotkey_1.isKeyHotkey('tab');
var isEnter = is_hotkey_1.isKeyHotkey('enter');
var isBackspace = is_hotkey_1.isKeyHotkey('backspace');
var MarkdownEditor = /** @class */ (function (_super) {
    __extends(MarkdownEditor, _super);
    function MarkdownEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onPaste = function (event, change) {
            var transfer = slate_react_1.getEventTransfer(event);
            console.log(transfer);
            var value = util_1.importMarkdown(transfer.text);
            var document = value.document;
            console.log('pasted', document.toJSON());
            change.insertFragment(document);
            console.log('pasted - result', change.value.toJSON());
            return true;
        };
        _this.WrapInBlockquote = function (event, change) {
            event.preventDefault();
            change.call(util_1.clear);
            _this.props.onChange(plugins.editBlockquote.changes.wrapInBlockquote(change));
            return true;
        };
        _this.wrapInList = function (type) {
            return function (event, change) {
                event.preventDefault();
                change.call(util_1.clear);
                _this.props.onChange(plugins.editList.changes.wrapInList(change, type).focus());
                return true;
            };
        };
        _this.onSpace = function (event, change) {
            var value = change.value;
            if (value.isExpanded)
                return;
            var startBlock = value.startBlock, startOffset = value.startOffset;
            var chars = startBlock.text;
            //.slice(0, startOffset)
            ///.replace(/\s*/g, '')
            console.log('chars', chars);
            switch (true) {
                case /^\s*[*+-]\s*$/.test(chars):
                    return _this.wrapInList('unordered_list')(event, change);
                case /^\s*\d\.\s*$/.test(chars):
                    return _this.wrapInList('ordered_list')(event, change);
                case /^\s*>\s*$/.test(chars):
                    return _this.WrapInBlockquote(event, change);
                default:
                    return;
            }
        };
        _this.onEnter = function (event, change) {
            if (/\s*`{3}.*/.test(change.value.startBlock.text)) {
                return toggleCode_1.default(event, change, _this.props.onChange);
            }
            var prev = util_1.getPrevious(change);
            if (prev &&
                prev.type == 'code_line' &&
                !prev.text &&
                !change.value.startBlock.text) {
                event.preventDefault();
                change.call(util_1.clear);
                return toggleCode_1.default(event, change, _this.props.onChange);
            }
            return;
        };
        _this.onKeyDown = function (event, change) {
            if (event.key == ' ')
                return _this.onSpace(event, change);
            if (isEnter(event))
                return _this.onEnter(event, change);
            if (isTab(event)) {
                event.preventDefault();
                event.stopPropagation();
                if (util_1.getDepth(change) <= 1) {
                    return toggleCode_1.default(event, change, _this.props.onChange);
                }
            }
            return;
        };
        return _this;
    }
    MarkdownEditor.prototype.render = function () {
        var value = this.props.value;
        return (React.createElement("div", null,
            React.createElement(Toolbar_1.default, { toolbar: this.props.toolbar }),
            React.createElement(slate_react_1.Editor, { placeholder: "Enter some text...", plugins: slatePlugins, value: this.props.value, onChange: this.props.onChange, renderNode: renderNode_1.default, renderMark: renderMark_1.default, onKeyDown: this.onKeyDown, onPaste: this.onPaste, autoFocus: true })));
    };
    MarkdownEditor.propTypes = {
        value: prop_types_1.default.object.isRequired,
        toolbar: prop_types_1.default.object.isRequired,
        onChange: prop_types_1.default.func.isRequired
    };
    return MarkdownEditor;
}(React.Component));
var theme = {
    backgroundColor: '#fafafa',
    fontFamily: '"Open Sans"'
};
var wrapped = function (Component) {
    var Wrapped = /** @class */ (function (_super) {
        __extends(Wrapped, _super);
        function Wrapped() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Wrapped.prototype.render = function () {
            return (React.createElement(ThemeProvider, { theme: theme },
                React.createElement(Component, __assign({}, this.props))));
        };
        return Wrapped;
    }(React.Component));
    return Wrapped;
};
exports.default = wrapped(MarkdownEditor);
//# sourceMappingURL=index.js.map