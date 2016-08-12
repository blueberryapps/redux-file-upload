'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _class, _desc, _value, _class2, _class3, _temp2;

var _autobind = require('core-decorators/lib/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var FileAPI = process.env.IS_BROWSER ? _bluebird2.default.promisifyAll(require('fileapi')) : null;

var FileUpload = (0, _radium2.default)(_class = (_class2 = (_temp2 = _class3 = function (_Component) {
  (0, _inherits3.default)(FileUpload, _Component);

  function FileUpload() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FileUpload);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(FileUpload)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      dragCount: 0
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FileUpload, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      FileAPI.event.on(this.refs.fileInput, 'change', this.handleFileChange);
      FileAPI.event.dnd(this.refs.fileInput, this.handleDragHover, this.handleFileChange);
      document.addEventListener('drop', this.preventDropEvent);
      document.addEventListener('dragover', this.preventDragOverEvent);
      document.addEventListener('dragenter', this.handleDocumentDragEnter);
      document.addEventListener('dragleave', this.handleDocumentDragLeave);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      FileAPI.event.off(this.refs.fileInput, 'change', this.handleFileChange);
      FileAPI.event.dnd.off(this.refs.fileInput, this.handleDragHover, this.handleFileChange);
      document.removeEventListener('drop', this.preventDropEvent);
      document.removeEventListener('dragover', this.preventDragOverEvent);
      document.removeEventListener('dragenter', this.handleDocumentDragEnter);
      document.removeEventListener('dragleave', this.handleDocumentDragLeave);
    }
  }, {
    key: 'handleDragHover',
    value: function handleDragHover(over) {
      this.setState({ dropzoneHover: over });
    }
  }, {
    key: 'handleDocumentDragEnter',
    value: function handleDocumentDragEnter() {
      var dragCount = this.state.dragCount;


      if (dragCount === 0) this.setState({ dropzoneActive: true });
      this.setState({ dragCount: dragCount + 1 });
    }
  }, {
    key: 'handleDocumentDragLeave',
    value: function handleDocumentDragLeave(event) {
      var dragCount = this.state.dragCount;


      event.preventDefault();
      if (dragCount === 1) this.setState({ dropzoneActive: false });
      this.setState({ dragCount: dragCount - 1 });
    }
  }, {
    key: 'handleFileChange',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(event) {
        var _props, allowedFileTypes, data, dropzoneId, identifier, url, dispatch, dragCount, allowedFiles, imageFiles, docFiles, reducerIdentificator;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _props = this.props;
                allowedFileTypes = _props.allowedFileTypes;
                data = _props.data;
                dropzoneId = _props.dropzoneId;
                identifier = _props.identifier;
                url = _props.url;
                dispatch = this.context.store.dispatch;
                dragCount = this.state.dragCount;


                if (dragCount === 1) this.setState({ dropzoneActive: false, dragCount: dragCount - 1 });

                if (!allowedFileTypes) {
                  _context.next = 15;
                  break;
                }

                _context.next = 12;
                return (0, _actions.filterAllowedFiles)(event, allowedFileTypes);

              case 12:
                _context.t0 = _context.sent;
                _context.next = 16;
                break;

              case 15:
                _context.t0 = event;

              case 16:
                allowedFiles = _context.t0;
                _context.next = 19;
                return (0, _actions.filterImageFiles)(allowedFiles);

              case 19:
                imageFiles = _context.sent;
                _context.next = 22;
                return (0, _actions.filterDocFiles)(allowedFiles);

              case 22:
                docFiles = _context.sent;
                reducerIdentificator = identifier || dropzoneId;


                if (!!imageFiles.length) {
                  dispatch((0, _actions.addUploadingImages)(dropzoneId, imageFiles));
                  dispatch((0, _actions.uploadFiles)(reducerIdentificator, url, imageFiles, 'image', data));
                }
                if (!!docFiles.length) {
                  dispatch((0, _actions.addUploadingDocs)(dropzoneId, docFiles));
                  dispatch((0, _actions.uploadFiles)(reducerIdentificator, url, docFiles, 'document', data));
                }

              case 26:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleFileChange(_x) {
        return _ref.apply(this, arguments);
      }

      return handleFileChange;
    }()
  }, {
    key: 'preventDropEvent',
    value: function preventDropEvent(event) {
      var dropzoneId = this.props.dropzoneId;

      if (event.target.id !== dropzoneId) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'none'; // eslint-disable-line no-param-reassign
      }
    }
  }, {
    key: 'preventDragOverEvent',
    value: function preventDragOverEvent(event) {
      var dropzoneId = this.props.dropzoneId;

      if (event.target.id !== dropzoneId) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'none'; // eslint-disable-line no-param-reassign
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var children = _props2.children;
      var className = _props2.className;
      var dropzoneActiveStyle = _props2.dropzoneActiveStyle;
      var dropzoneId = _props2.dropzoneId;
      var dropzoneStyle = _props2.dropzoneStyle;
      var multiple = _props2.multiple;
      var dropzoneActive = this.state.dropzoneActive;


      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'form',
          { ref: 'fileUpload' },
          _react2.default.createElement(
            'label',
            { style: [dropzoneStyle || styles.dropzone.base, dropzoneActive && (dropzoneActiveStyle || styles.dropzone.active)] },
            _react2.default.createElement('input', {
              id: dropzoneId,
              multiple: multiple,
              ref: 'fileInput',
              style: styles.input,
              type: 'file'
            }),
            children
          )
        )
      );
    }
  }]);
  return FileUpload;
}(_component2.default), _class3.propTypes = {
  allowedFileTypes: _react.PropTypes.array,
  children: _react.PropTypes.element,
  className: _react.PropTypes.string,
  data: _react.PropTypes.object,
  dropzoneActiveStyle: _react.PropTypes.object,
  dropzoneId: _react.PropTypes.string.isRequired,
  dropzoneStyle: _react.PropTypes.object,
  identifier: _react.PropTypes.string,
  multiple: _react.PropTypes.bool,
  url: _react.PropTypes.string.isRequired
}, _class3.contextTypes = {
  store: _react.PropTypes.object.isRequired
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleDragHover', [_autobind2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'handleDragHover'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleDocumentDragEnter', [_autobind2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'handleDocumentDragEnter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleDocumentDragLeave', [_autobind2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'handleDocumentDragLeave'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleFileChange', [_autobind2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'handleFileChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'preventDropEvent', [_autobind2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'preventDropEvent'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'preventDragOverEvent', [_autobind2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'preventDragOverEvent'), _class2.prototype)), _class2)) || _class;

exports.default = FileUpload;


var styles = {
  dropzone: {
    base: {
      backgroundColor: 'white',
      display: 'block',
      position: 'relative',
      textAlign: 'center'
    },
    active: {
      border: '1px solid grey'
    }
  },

  input: {
    bottom: 0,
    cursor: 'pointer',
    left: 0,
    opacity: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 1
  }
};
module.exports = exports['default'];