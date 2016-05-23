import Component from 'react-pure-render/component';
import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';
import UploadingDocument from './UploadingDocument';

@Radium
export default class DocumentPreview extends Component {

  static propTypes = {
    uploadingDocument: RPT.instanceOf(UploadingDocument).isRequired
  };

  render() {
    const {
      uploadingDocument: { fileName, progress, error },
      ...containerProps
    } = this.props;
    const percentage = `${progress} %`;
    const inheritedStyle = containerProps.style;
    const propsWithoutStyle = { ...containerProps };

    delete propsWithoutStyle.style;

    return (
      <div style={inheritedStyle} {...propsWithoutStyle}>
        <div style={styles.fileWrapper}>
          <strong>Processing</strong>
          <br />
          <p> {fileName}</p>
          {error && <p>{error}</p>}
          <p style={styles.percentage}>
            {percentage}
          </p>
        </div>
      </div>
    );
  }
}

const styles = {
  percentage: {
    background: 'rgba(0, 0, 0, .7)',
    color: '#fff',
    display: 'inline-block',
    margin: '0',
    padding: '3px 8px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)'
  },

  fileWrapper: {
    maxHeight: '186px',
    position: 'relative'
  },

  wrapper: {
    display: 'inline-block',
    width: '186px',
    height: '186px',
    padding: '0 5px'
  }
};
