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
        <div style={styles.photoWrapper}>
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

  photo: {
    maxWidth: '100%',
  },

  photoWrapper: {
    maxHeight: '186px',
    position: 'relative'
  },

  remove: {
    background: 'rgba(0, 0, 0, .5)',
    border: '0',
    outline: '0',
    position: 'absolute',
    right: '0',
    top: '0',
    padding: '4px',
    transition: 'all .1s linear',
    ':hover': {
      background: 'rgba(0, 0, 0, .8)'
    }
  },

  row: {
    margin: '0 -5px'
  },

  wrapper: {
    display: 'inline-block',
    width: '186px',
    height: '186px',
    padding: '0 5px'
  }
};
