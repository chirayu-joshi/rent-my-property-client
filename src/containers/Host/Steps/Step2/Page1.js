import React, { Component } from 'react';
import axios from '../../../../axios';

import styles from '../Steps.module.css';
import InputImage from '../../../InputImage/InputImage';
import ImageContainer from '../../../ImageContainer/ImageContainer';
import secrets from '../../../../secret';

class Page1 extends Component {
  state = {
    imagesUploaded: false,
    thumbnailsLoaded: false,
    images: []
  }

  loadImages = () => {
    this.setState({ imagesUploaded: true });
    axios
      .get('/api/host/step2/propertyImage')
      .then(res => {
        res.data.forEach(imageDetails => {
          this.setState(prevState => ({
            images: [
              ...prevState.images,
              {imageName: imageDetails.filename, imageId: imageDetails._id}
            ]
          }));
        });
      })
      .catch(err => {
        console.log(err, 'Error while fetching image details');
      });
  }

  componentDidMount() {
    // Look if user already has uploaded images and not looking to change it.
    axios.get('/api/host/step2/propertyImage')
      .then(res => {
        if (res.data) {
          res.data.forEach(imageDetails => {
            this.setState(prevState => ({
              images: [
                ...prevState.images,
                {imageName: imageDetails.filename, imageId: imageDetails._id}
              ]
            }));
          });
        }
      })
      .catch(err => {
        console.log('User has not uploaded any images yet');
      });
  }

  render() {
    const uploadedImages = this.state.images
      ? this.state.images.map(image => (
          <ImageContainer 
            key={image.imageId}
            preImgHeight='200px' 
            src={secrets.baseURL + '/api/images/' + image.imageName} /> 
        ))
      : null;
    return (
      <div className={styles.page}>
        <h1>Add photos to your listing</h1>
        <p>Photos help guests imagine staying in your place.</p>

        <InputImage reqLink="/api/host/step2/propertyImage" onSuccess={this.loadImages} />
        { uploadedImages }
      </div>
    );
  }
}

export default Page1;
