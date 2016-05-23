import Component from 'react-pure-render/component';
import DocumentPreview from './DocumentPreview.react';
import ImagePreview from './ImagePreview.react';
import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';

@Radium
export default class UploadPreview extends Component {

  static propTypes = {
    fileUpload: RPT.object.isRequired
  };

  render() {
    const { fileUpload, ...containerProps } = this.props;
    const inheritedStyle = containerProps.style;
    const propsWithoutStyle = { ...containerProps };
    const uploadingImages = fileUpload.getIn(['uploadingImages', 'docsUpload']);
    const uploadingDocuments = fileUpload.getIn(['uploadingDocuments', 'docsUpload']);
    delete propsWithoutStyle.style;

    return (
      <div style={[inheritedStyle, styles.container]} {...propsWithoutStyle}>
        {!!uploadingImages && uploadingImages.map((uploadingImage, i) =>
          <div style={styles.imageContainer}>
            <ImagePreview
              key={`${i}_preview`}
              style={[styles.image, styles.preview]}
              uploadingImage={uploadingImage}
            />
          </div>
        )}
        {!!uploadingDocuments && uploadingDocuments.map((uploadingDocument, i) =>
          <div style={styles.imageContainer}>
            <DocumentPreview
              key={`${i}_docpreview`}
              style={[styles.image, styles.preview]}
              uploadingDocument={uploadingDocument}
            />
          </div>
        )}
      </div>
    );
  }

}

const styles = {
  container: {
    width: 'auto',
    display: 'inline',
    padding: '0',
    marginRight: '-5px',
    position: 'relative',
    left: '5px'
  },
  imageContainer: {
    position: 'relative',
    height: '176px',
    width: '176px',
    marginRight: '10px',
    display: 'inline-block'
  },
  image: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  },
  preview: { zIndex: 1 },
  photo: { zIndex: 2 }
};
