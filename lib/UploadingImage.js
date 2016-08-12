'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var UploadingImage = (0, _immutable.Record)({
  dataURL: null,
  error: null,
  file: null,
  photo: null,
  progress: 0
});

exports.default = UploadingImage;
module.exports = exports['default'];