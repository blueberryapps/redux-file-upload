import { Record } from 'immutable';

const UploadingDocument = Record({
  error: null,
  file: null,
  fileName: null,
  progress: 0,
});

export default UploadingDocument;
