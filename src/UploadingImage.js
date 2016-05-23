import { Record } from 'immutable';

const UploadingImage = Record({
  dataURL: null,
  error: null,
  file: null,
  photo: null,
  progress: 0,
});

export default UploadingImage;
