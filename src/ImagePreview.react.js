import Component from 'react-pure-render/component';
import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';
import UploadingImage from './UploadingImage';

@Radium
export default class ImagePreview extends Component {

  static propTypes = {
    uploadingImage: RPT.instanceOf(UploadingImage).isRequired
  };

  render() {
    const {
      uploadingImage: { dataURL, progress, error, photo },
      ...containerProps
    } = this.props;
    const percentage = `${progress} %`;
    const processingOnServer = progress === 100 && photo === null;
    const inheritedStyle = containerProps.style;
    const propsWithoutStyle = { ...containerProps };

    delete propsWithoutStyle.style;

    return (
      <div style={inheritedStyle} {...propsWithoutStyle}>
        <div style={styles.fileWrapper}>
          <img
            role="presentation"
            src={dataURL}
            style={[styles.photo, { opacity: processingOnServer ? 0.4 : 1 }]}
          />
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
