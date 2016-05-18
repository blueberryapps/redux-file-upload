import { Record } from 'immutable';

const UploadingDocument = Record({
  error: null,
  file: null,
  progress: 0,
  fileName: null
});

export default UploadingDocument;
