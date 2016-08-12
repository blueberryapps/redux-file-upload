'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FILE_UPLOAD_PROGRESS = exports.FILE_UPLOAD_MULTIPLE_FILE_UPLOAD = exports.FILE_UPLOAD_COMPLETE = exports.FILE_UPLOAD_ERROR = exports.FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS = exports.FILE_UPLOAD_ADD_UPLOADING_IMAGES = exports.FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS_SUCCESS = exports.FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS = exports.THUMBNAIL_HEIGHT = exports.THUMBNAIL_WIDTH = undefined;
exports.addUploadingImages = addUploadingImages;
exports.addUploadingDocs = addUploadingDocs;
exports.uploadFiles = uploadFiles;
exports.filterAllowedFiles = filterAllowedFiles;
exports.filterImageFiles = filterImageFiles;
exports.filterDocFiles = filterDocFiles;
exports.fileProgress = fileProgress;
exports.fileComplete = fileComplete;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileAPI = process.env.IS_BROWSER ? require('fileapi') : null;
var IMAGE_TYPES = /^image\/(jpe?g|png|gif|jf?if|tiff?)$/i;

var THUMBNAIL_WIDTH = exports.THUMBNAIL_WIDTH = 200;
var THUMBNAIL_HEIGHT = exports.THUMBNAIL_HEIGHT = 200;

var FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS = exports.FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS = 'FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS';
var FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS_SUCCESS = exports.FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS_SUCCESS = 'FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS_SUCCESS';
var FILE_UPLOAD_ADD_UPLOADING_IMAGES = exports.FILE_UPLOAD_ADD_UPLOADING_IMAGES = 'FILE_UPLOAD_ADD_UPLOADING_IMAGES';
var FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS = exports.FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS = 'FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS';
var FILE_UPLOAD_ERROR = exports.FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR';
var FILE_UPLOAD_COMPLETE = exports.FILE_UPLOAD_COMPLETE = 'FILE_UPLOAD_COMPLETE';
var FILE_UPLOAD_MULTIPLE_FILE_UPLOAD = exports.FILE_UPLOAD_MULTIPLE_FILE_UPLOAD = 'FILE_UPLOAD_MULTIPLE_FILE_UPLOAD';
var FILE_UPLOAD_PROGRESS = exports.FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS';

function getThumbnails(imageFiles) {
  return _bluebird2.default.all(imageFiles.map(getImageThumbnail));
}

function getImageThumbnail(imageFile) {
  return new _bluebird2.default(function (resolve, reject) {
    FileAPI.Image(imageFile).preview(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT).get(function (err, canvas) {
      if (err) reject(err);

      resolve({
        dataURL: canvas.toDataURL(),
        file: imageFile
      });
    });
  });
}

function uploadFile(dispatch, url, identificator, file, data) {
  return new _bluebird2.default(function (resolve) {
    FileAPI.upload({
      data: data,
      files: {
        file: file
      },
      complete: resolve,
      fileprogress: function fileprogress() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return dispatch(fileProgress.apply(undefined, [identificator].concat(args)));
      },
      filecomplete: function filecomplete() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return dispatch(fileComplete.apply(undefined, [identificator].concat(args)));
      },
      url: url
    });
  });
}

function isImage(file) {
  return IMAGE_TYPES.test(file.type);
}

function isDoc(file) {
  return !isImage(file);
}

function addUploadingImages(identificator, imageFiles) {
  return {
    type: FILE_UPLOAD_ADD_UPLOADING_IMAGES,
    payload: {
      promise: getThumbnails(imageFiles)
    },
    meta: {
      identificator: identificator
    }
  };
}

function addUploadingDocs(identificator, docFiles) {
  var documentPromise = _bluebird2.default.all(docFiles);

  return {
    type: FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS,
    payload: {
      promise: documentPromise
    },
    meta: {
      identificator: identificator
    }
  };
}

function uploadFiles(identificator, url, files, type, data) {
  var concurrency = arguments.length <= 5 || arguments[5] === undefined ? 2 : arguments[5];

  return function (_ref) {
    var dispatch = _ref.dispatch;

    var uploadFilePromise = _bluebird2.default.map(files, function (file) {
      return uploadFile(dispatch, url, identificator, file, data);
    }, { concurrency: concurrency });

    return {
      type: FILE_UPLOAD_MULTIPLE_FILE_UPLOAD,
      payload: {
        promise: uploadFilePromise
      }
    };
  };
}

function filterAllowedFiles(payload, allowedFileTypes) {
  var allowedFilter = new RegExp(allowedFileTypes.join('|') + '$', 'i');

  return new _bluebird2.default(function (resolve) {
    if (payload instanceof Event) FileAPI.getFiles(payload, function (file) {
      return allowedFilter.test(file.type);
    }, resolve);else FileAPI.filterFiles(payload, function (file) {
      return allowedFilter.test(file.type);
    }, resolve);
  });
}

function filterImageFiles(payload) {
  return new _bluebird2.default(function (resolve) {
    if (payload instanceof Event) FileAPI.getFiles(payload, isImage, resolve);else FileAPI.filterFiles(payload, isImage, resolve);
  });
}

function filterDocFiles(payload) {
  return new _bluebird2.default(function (resolve) {
    if (payload instanceof Event) FileAPI.getFiles(payload, isDoc, resolve);else FileAPI.filterFiles(payload, isDoc, resolve);
  });
}

function fileProgress(identificator, event, file, fileType) {
  var progress = event.loaded / event.total * 100;

  return {
    type: FILE_UPLOAD_PROGRESS,
    payload: { identificator: identificator, file: file, fileType: fileType, progress: progress, isImage: isImage(file), isDoc: isDoc(file) }
  };
}

function fileComplete(identificator, error, xhr, file) {
  if (error) return {
    type: FILE_UPLOAD_ERROR,
    payload: { identificator: identificator, file: file, error: error, isImage: isImage(file), isDoc: isDoc(file) }
  };

  var _JSON$parse = JSON.parse(xhr.response);

  var photo = _JSON$parse.photo;


  return {
    type: FILE_UPLOAD_COMPLETE,
    payload: { identificator: identificator, file: file, photo: photo }
  };
}