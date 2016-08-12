'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var UploadingDocument = (0, _immutable.Record)({
  error: null,
  file: null,
  fileName: null,
  progress: 0
});

exports.default = UploadingDocument;
module.exports = exports['default'];