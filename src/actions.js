import isServer from 'detect-node';
import Promise from 'bluebird';
import { isDoc, isImage } from './helpers';

const FileAPI = !isServer ? require('fileapi') : null;

export const THUMBNAIL_WIDTH = 200;
export const THUMBNAIL_HEIGHT = 200;

export const FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS = 'FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS';
export const FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS_SUCCESS = 'FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS_SUCCESS';
export const FILE_UPLOAD_ADD_UPLOADING_IMAGES = 'FILE_UPLOAD_ADD_UPLOADING_IMAGES';
export const FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS = 'FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS';
export const FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR';
export const FILE_UPLOAD_COMPLETE = 'FILE_UPLOAD_COMPLETE';
export const FILE_UPLOAD_MULTIPLE_FILE_UPLOAD = 'FILE_UPLOAD_MULTIPLE_FILE_UPLOAD';
export const FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS';

function getThumbnails(imageFiles) {
  return Promise.all(
    imageFiles.map(getImageThumbnail)
  );
}

function getImageThumbnail(imageFile) {
  return new Promise((resolve, reject) => {
    FileAPI.Image(imageFile)
    .preview(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT)
    .get((err, canvas) => {
      if (err) reject(err);

      resolve({
        dataURL: canvas.toDataURL(),
        file: imageFile
      });
    });
  });
}

function uploadFile(dispatch, url, identificator, file, data) {
  return new Promise(resolve => {
    FileAPI.upload({
      data,
      files: {
        file
      },
      complete: resolve,
      fileprogress: (...args) => dispatch(fileProgress(identificator, ...args)),
      filecomplete: (...args) => dispatch(fileComplete(identificator, ...args)),
      url,
    });
  });
}

export function addUploadingImages(identificator, imageFiles) {
  return {
    type: FILE_UPLOAD_ADD_UPLOADING_IMAGES,
    payload: {
      promise: getThumbnails(imageFiles)
    },
    meta: {
      identificator
    }
  };
}

export function addUploadingDocs(identificator, docFiles) {
  const documentPromise = Promise.all(docFiles);

  return {
    type: FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS,
    payload: {
      promise: documentPromise
    },
    meta: {
      identificator
    }
  };
}

export function uploadFiles(identificator, url, files, type, data, concurrency = 2) {
  return params => {
    const dispatch = typeof params === 'function' ? params : params.dispatch;
    const uploadFilePromise = Promise.map(
      files,
      file => uploadFile(dispatch, url, identificator, file, data),
      { concurrency }
    );

    return {
      type: FILE_UPLOAD_MULTIPLE_FILE_UPLOAD,
      payload: {
        promise: uploadFilePromise
      }
    };
  };
}

export function fileProgress(identificator, event, file, fileType) {
  const progress = event.loaded / event.total * 100;

  return {
    type: FILE_UPLOAD_PROGRESS,
    payload: { identificator, file, fileType, progress, isImage: isImage(file), isDoc: isDoc(file) }
  };
}

export function fileComplete(identificator, error, xhr, file) {
  if (error)
    return {
      type: FILE_UPLOAD_ERROR,
      payload: { identificator, file, error, isImage: isImage(file), isDoc: isDoc(file) }
    };

  const { photo } = JSON.parse(xhr.response);

  return {
    type: FILE_UPLOAD_COMPLETE,
    payload: { identificator, file, photo }
  };
}
