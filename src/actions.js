const FileAPI = process.env.IS_BROWSER ? require('fileapi') : null;
const IMAGE_TYPES = /^image\/(jpe?g|png|gif|jf?if|tiff?)$/i;

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

function isImage(file) {
  return IMAGE_TYPES.test(file.type);
}

function isDoc(file) {
  return !isImage(file);
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
  return ({ dispatch }) => {
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

export function filterAllowedFiles(payload, allowedFileTypes) {
  const allowedFilter = new RegExp(`${allowedFileTypes.join('|')}$`, 'i');

  return new Promise(resolve => {
    if (payload instanceof Event) FileAPI.getFiles(payload, file => allowedFilter.test(file.type), resolve);
    else FileAPI.filterFiles(payload, file => allowedFilter.test(file.type), resolve);
  });
}

export function filterImageFiles(payload) {
  return new Promise(resolve => {
    if (payload instanceof Event) FileAPI.getFiles(payload, isImage, resolve);
    else FileAPI.filterFiles(payload, isImage, resolve);
  });
}

export function filterDocFiles(payload) {
  return new Promise(resolve => {
    if (payload instanceof Event) FileAPI.getFiles(payload, isDoc, resolve);
    else FileAPI.filterFiles(payload, isDoc, resolve);
  });
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
