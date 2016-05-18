import { Record } from 'immutable';

const UploadingImage = Record({
  error: null,
  dataURL: null,
  file: null,
  progress: 0,
  photo: null
});

export default UploadingImage;
