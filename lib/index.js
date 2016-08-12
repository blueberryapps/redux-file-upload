'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _FileUpload = require('./FileUpload.react');

var _FileUpload2 = _interopRequireDefault(_FileUpload);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _UploadingDocument = require('./UploadingDocument');

var _UploadingDocument2 = _interopRequireDefault(_UploadingDocument);

var _UploadingImage = require('./UploadingImage');

var _UploadingImage2 = _interopRequireDefault(_UploadingImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  actions: actions,
  FileUpload: _FileUpload2.default,
  reducer: _reducer2.default,
  UploadingDocument: _UploadingDocument2.default,
  UploadingImage: _UploadingImage2.default
};
module.exports = exports['default'];