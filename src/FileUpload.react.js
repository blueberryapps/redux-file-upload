import autobind from 'core-decorators/lib/autobind';
import Component from 'react-pure-render/component';
import Promise from 'bluebird';
import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';
import { addUploadingDocs, addUploadingImages, filterDocFiles, filterImageFiles, uploadFiles } from './actions';

const DROPZONE_ID = 'fileInput';
const FileAPI = process.env.IS_BROWSER ? Promise.promisifyAll(require('fileapi')) : null;

@Radium
export default class FileUpload extends Component {

  static propTypes = {
    identificator: RPT.string.isRequired,
    uploadType: RPT.string.isRequired,
    multiple: RPT.bool
  };

  static contextTypes = {
    store: RPT.object.isRequired
  };

  state = {
    dragCount: 0
  };

  componentDidMount() {
    FileAPI.event.on(this.refs.fileInput, 'change', this.handleFileChange);
    FileAPI.event.dnd(this.refs.fileInput, this.handleDragHover, this.handleFileChange);
    document.addEventListener('drop', this.preventDropEvent);
    document.addEventListener('dragover', this.preventDragOverEvent);
    document.addEventListener('dragenter', this.handleDocumentDragEnter);
    document.addEventListener('dragleave', this.handleDocumentDragLeave);
  }

  componentWillUnmount() {
    FileAPI.event.off(this.refs.fileInput, 'change', this.handleFileChange);
    FileAPI.event.dnd.off(this.refs.fileInput, this.handleDragHover, this.handleFileChange);
    document.removeEventListener('drop', this.preventDropEvent);
    document.removeEventListener('dragover', this.preventDragOverEvent);
    document.removeEventListener('dragenter', this.handleDocumentDragEnter);
    document.removeEventListener('dragleave', this.handleDocumentDragLeave);
  }

  @autobind
  handleDragHover(over) {
    this.setState({ dropzoneHover: over });
  }

  @autobind
  handleDocumentDragEnter() {
    const { dragCount } = this.state;

    if (dragCount === 0) this.setState({ dropzoneActive: true });
    this.setState({ dragCount: dragCount + 1 });
  }

  @autobind
  handleDocumentDragLeave(event) {
    const { dragCount } = this.state;

    event.preventDefault();
    if (dragCount === 1) this.setState({ dropzoneActive: false });
    this.setState({ dragCount: dragCount - 1 });
  }

  @autobind
  async handleFileChange(event) {
    const {
      identificator,
      uploadType,
     } = this.props;

    const { dispatch } = this.context.store;

    const { dragCount } = this.state;

    if (dragCount === 1)
      this.setState({ dropzoneActive: false, dragCount: dragCount - 1 });

    const imageFiles = await filterImageFiles(event);
    const docFiles = await filterDocFiles(event);

    if (!!imageFiles.length) {
      dispatch(addUploadingImages(identificator, imageFiles));
      dispatch(uploadFiles(identificator, imageFiles, 'image', uploadType));
    }
    if (!!docFiles.length) {
      dispatch(addUploadingDocs(identificator, docFiles));
      dispatch(uploadFiles(identificator, docFiles, 'document', uploadType));
    }
  }

  @autobind
  preventDropEvent(event) {
    if (event.target.id !== DROPZONE_ID) {
      event.preventDefault();
      event.dataTransfer.effectAllowed = 'none'; // eslint-disable-line no-param-reassign
      event.dataTransfer.dropEffect = 'none'; // eslint-disable-line no-param-reassign
    }
  }

  @autobind
  preventDragOverEvent(event) {
    if (event.target.id !== DROPZONE_ID) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'none'; // eslint-disable-line no-param-reassign
    }
  }

  render() {
    const { multiple } = this.props;

    const { dropzoneActive } = this.state;

    return (
      <div style={styles.wrapper}>
        <form ref="fileUpload">
          <label style={[styles.dropzone.base, dropzoneActive && styles.dropzone.active]}>
            <input
              id={DROPZONE_ID}
              multiple={multiple}
              ref="fileInput"
              style={styles.input}
              type="file"
            />
            <p style={styles.text.base}>
              <div style={styles.placeholder}>something</div>
            </p>
          </label>
        </form>
      </div>
    );
  }

}

const styles = {
  heading: {
    fontSize: '48px',
    margin:   0
  },

  infoText: {
    marginBottom: '32px',
    marginTop:    '40px'
  },

  placeholder: {
    // color:     colors.gray,
    fontSize:  '12px',
    textAlign: 'center'
  },

  uploadWrapper: {
    textAlign: 'center'
  },
  upload: {
    margin: '16px auto 0'
  },

  dropzone: {
    base: {
      backgroundColor: 'white',
      border:          '2px solid white',
      padding:         '24px',
      display: 'block',
      position: 'relative',
      textAlign: 'center',
      transition: '.2s'
    },
    active: {
      border:      '2px dashed',
      // borderColor: colors.primary
    }
  },

  input: {
    opacity: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    zIndex: 1,
    cursor: 'pointer'
  },

  text: {
    base: {
      fontSize: '1.4rem',
      margin: '0',
      position: 'absolute',
      top: '50%',
      left: '5px',
      right: '5px',
      transform: 'translateY(-50%)'
    },
    strong: {
      borderBottom: '1px solid purple',
      color: 'purple',
      fontWeight: '300'
    }
  },

  wrapper: {
    padding: '30px 0'
  }
};
