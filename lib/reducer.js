'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = fileUploadReducer;

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _UploadingDocument = require('./UploadingDocument');

var _UploadingDocument2 = _interopRequireDefault(_UploadingDocument);

var _UploadingImage = require('./UploadingImage');

var _UploadingImage2 = _interopRequireDefault(_UploadingImage);

var _immutable = require('immutable');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InitialState = (0, _immutable.Record)({
  documents: (0, _immutable.Map)(),
  images: (0, _immutable.Map)()
});
var initialState = new InitialState();

function revive() {
  return initialState.merge({});
}

function fileUploadReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case actions.FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS:
      {
        var _ret = function () {
          var identificator = action.meta.identificator;


          var newUploadingImages = action.payload.map(function (uploadingImage) {
            return new _UploadingImage2.default(uploadingImage);
          });

          return {
            v: state.updateIn(['images', identificator], function (images) {
              return (0, _immutable.List)(images).concat((0, _immutable.List)(newUploadingImages));
            })
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
      }

    case actions.FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS_SUCCESS:
      {
        var _ret2 = function () {
          var identificator = action.meta.identificator;


          var newUploadingDocument = action.payload.map(function (uploadingDocument) {
            return new _UploadingDocument2.default({ file: uploadingDocument });
          });

          return {
            v: state.updateIn(['documents', identificator], function (documents) {
              return (0, _immutable.List)(documents).concat((0, _immutable.List)(newUploadingDocument));
            })
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret2)) === "object") return _ret2.v;
      }

    case actions.FILE_UPLOAD_PROGRESS:
      {
        var _ret3 = function () {
          var _action$payload = action.payload;
          var identificator = _action$payload.identificator;
          var file = _action$payload.file;
          var progress = _action$payload.progress;
          var isImage = _action$payload.isImage;
          var isDoc = _action$payload.isDoc;


          if (isImage) return {
              v: updateUploadingImage(state, identificator, file, function (uploadingImage) {
                return uploadingImage.set('progress', Math.round(progress));
              })
            };
          if (isDoc) return {
              v: updateUploadingDocument(state, identificator, file, function (uploadingDocument) {
                return uploadingDocument.set('progress', Math.round(progress));
              })
            };
          return {
            v: state
          };
        }();

        if ((typeof _ret3 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret3)) === "object") return _ret3.v;
      }

    case actions.FILE_UPLOAD_ERROR:
      {
        var _ret4 = function () {
          var _action$payload2 = action.payload;
          var identificator = _action$payload2.identificator;
          var file = _action$payload2.file;
          var error = _action$payload2.error;
          var isImage = _action$payload2.isImage;
          var isDoc = _action$payload2.isDoc;

          if (isImage) return {
              v: updateUploadingImage(state, identificator, file, function (uploadingImage) {
                return uploadingImage.set('error', error);
              })
            };
          if (isDoc) return {
              v: updateUploadingDocument(state, identificator, file, function (uploadingDocument) {
                return uploadingDocument.set('error', error);
              })
            };
          return {
            v: state
          };
        }();

        if ((typeof _ret4 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret4)) === "object") return _ret4.v;
      }

  }

  return state;
}

function updateUploadingImage(state, identificator, file, updater) {
  return state.updateIn(['images', identificator], function (images) {
    return (0, _immutable.List)(images).map(function (uploadingImage) {
      return (// eslint-disable-line no-confusing-arrow
        uploadingImage.file === file ? updater(uploadingImage) : uploadingImage
      );
    });
  });
}

function updateUploadingDocument(state, identificator, file, updater) {
  return state.updateIn(['documents', identificator], function (documents) {
    return (0, _immutable.List)(documents).map(function (uploadingDocument) {
      return (// eslint-disable-line no-confusing-arrow
        uploadingDocument.file === file ? updater(uploadingDocument) : uploadingDocument
      );
    });
  });
}
module.exports = exports['default'];