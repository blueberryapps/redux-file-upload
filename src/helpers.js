import Promise from 'bluebird';

const hasFileApi = () => {
  try {
    return !!(window.File && window.FileList && window.FileReader);
  } catch (e) {
    return false;
  }
};

const FileAPI = hasFileApi() ? require('fileapi') : null;
const IMAGE_TYPES = /^image\/(jpe?g|png|gif|jf?if|tiff?)$/i;

export function isImage(file) {
  return IMAGE_TYPES.test(file.type);
}

export function isDoc(file) {
  return !isImage(file);
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

export function filterAllowedFiles(payload, allowedFileTypes) {
  const allowedFilter = new RegExp(`${allowedFileTypes.join('|')}$`, 'i');

  return new Promise(resolve => {
    if (payload instanceof Event) FileAPI.getFiles(payload, file => allowedFilter.test(file.type), resolve);
    else FileAPI.filterFiles(payload, file => allowedFilter.test(file.type), resolve);
  });
}
