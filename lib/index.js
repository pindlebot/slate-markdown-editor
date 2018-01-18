'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _slatePlainSerializer = require('slate-plain-serializer');

var _slatePlainSerializer2 = _interopRequireDefault(_slatePlainSerializer);

var _slateReact = require('slate-react');

var _Prism = require('./Prism');

var _Prism2 = _interopRequireDefault(_Prism);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SlateMarkdownEditor = function (_React$Component) {
  (0, _inherits3.default)(SlateMarkdownEditor, _React$Component);

  function SlateMarkdownEditor() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SlateMarkdownEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SlateMarkdownEditor.__proto__ || (0, _getPrototypeOf2.default)(SlateMarkdownEditor)).call.apply(_ref, [this].concat(args))), _this), _this.renderMark = function (props) {
      var children = props.children,
          mark = props.mark;

      switch (mark.type) {
        case 'bold':
          return _react2.default.createElement(
            'strong',
            null,
            children
          );
        case 'code':
          return _react2.default.createElement(
            'code',
            null,
            children
          );
        case 'italic':
          return _react2.default.createElement(
            'em',
            null,
            children
          );
        case 'underlined':
          return _react2.default.createElement(
            'u',
            null,
            children
          );
        case 'title':
          {
            return _react2.default.createElement(
              'span',
              { style: { fontWeight: 'bold', fontSize: '20px', margin: '20px 0 10px 0', display: 'inline-block' } },
              children
            );
          }
        case 'punctuation':
          {
            return _react2.default.createElement(
              'span',
              { style: { opacity: 0.2 } },
              children
            );
          }
        case 'list':
          {
            return _react2.default.createElement(
              'span',
              { style: { paddingLeft: '10px', lineHeight: '10px', fontSize: '20px' } },
              children
            );
          }
        case 'hr':
          {
            return _react2.default.createElement(
              'span',
              { style: { borderBottom: '2px solid #000', display: 'block', opacity: 0.2 } },
              children
            );
          }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SlateMarkdownEditor, [{
    key: 'decorateNode',
    value: function decorateNode(node) {
      if (node.kind != 'block') return;

      var string = node.text;
      var texts = node.getTexts().toArray();
      var grammar = _Prism2.default.languages.markdown;
      var tokens = _Prism2.default.tokenize(string, grammar);
      var decorations = [];
      var startText = texts.shift();
      var endText = startText;
      var startOffset = 0;
      var endOffset = 0;
      var start = 0;

      function getLength(token) {
        if (typeof token == 'string') {
          return token.length;
        } else if (typeof token.content == 'string') {
          return token.content.length;
        } else {
          return token.content.reduce(function (l, t) {
            return l + getLength(t);
          }, 0);
        }
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(tokens), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var token = _step.value;

          startText = endText;
          startOffset = endOffset;

          var length = getLength(token);
          var end = start + length;

          var available = startText.text.length - startOffset;
          var remaining = length;

          endOffset = startOffset + remaining;

          while (available < remaining) {
            endText = texts.shift();
            remaining = length - available;
            available = endText.text.length;
            endOffset = remaining;
          }

          if (typeof token != 'string') {
            var range = {
              anchorKey: startText.key,
              anchorOffset: startOffset,
              focusKey: endText.key,
              focusOffset: endOffset,
              marks: [{ type: token.type }]
            };

            decorations.push(range);
          }

          start = end;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return decorations;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          onChange = _props.onChange,
          placeholder = _props.placeholder,
          rest = (0, _objectWithoutProperties3.default)(_props, ['value', 'onChange', 'placeholder']);


      return _react2.default.createElement(_slateReact.Editor, (0, _extends3.default)({
        placeholder: placeholder,
        value: value,
        onChange: onChange,
        renderMark: this.renderMark,
        decorateNode: this.decorateNode
      }, rest));
    }
  }]);
  return SlateMarkdownEditor;
}(_react2.default.Component);

SlateMarkdownEditor.defaultProps = {
  placeholder: 'What are you thinking? 🤔',
  value: _slatePlainSerializer2.default.deserialize('')
};

exports.default = SlateMarkdownEditor;