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
    children: RPT.element,
    dropzoneStyle: RPT.object,
    dropzoneActiveStyle: RPT.object,
    identificator: RPT.string.isRequired,
    uploadType: RPT.string.isRequired,
    url: RPT.string.isRequired,
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
      url
     } = this.props;

    const { dispatch } = this.context.store;

    const { dragCount } = this.state;

    if (dragCount === 1)
      this.setState({ dropzoneActive: false, dragCount: dragCount - 1 });

    const imageFiles = await filterImageFiles(event);
    const docFiles = await filterDocFiles(event);

    if (!!imageFiles.length) {
      dispatch(addUploadingImages(identificator, imageFiles));
      dispatch(uploadFiles(identificator, url, imageFiles, 'image', uploadType));
    }
    if (!!docFiles.length) {
      dispatch(addUploadingDocs(identificator, docFiles));
      dispatch(uploadFiles(identificator, url, docFiles, 'document', uploadType));
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
    const { children, dropzoneActiveStyle, dropzoneStyle, multiple } = this.props;

    const { dropzoneActive } = this.state;

    return (
      <div>
        <form ref="fileUpload">
          <label style={[dropzoneStyle || styles.dropzone.base, dropzoneActive && (dropzoneActiveStyle || styles.dropzone.active)]}>
            <input
              id={DROPZONE_ID}
              multiple={multiple}
              ref="fileInput"
              style={styles.input}
              type="file"
            />
          {children}
          </label>
        </form>
      </div>
    );
  }

}

const styles = {
  dropzone: {
    base: {
      backgroundColor: 'white',
      display: 'block',
      position: 'relative',
      textAlign: 'center'
    },
    active: {
      border: '1px solid grey',
    }
  },

  input: {
    bottom: 0,
    cursor: 'pointer',
    left: 0,
    opacity: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 1
  },
};
