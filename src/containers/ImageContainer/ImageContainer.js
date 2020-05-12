import React, { Component } from 'react';

import styles from './ImageContainer.module.css';
import Spinner from '../../components/Spinner/Spinner';

class ImageContainer extends Component {
  state = {
    isLoading: true
  }

  imageLoadedHandler = () => {
    this.setState({
      isLoading: false
    });
  }

  render() {
    return (
      <div className={styles.image}>
        <div 
          className={styles.preImage} 
          style={{ display: this.state.isLoading ? 'flex' : 'none', height: this.props.preImgHeight }}>
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        </div>
        <div className={styles.imageContainer} style={{ display: this.state.isLoading ? 'none' : 'block' }}>
          <img
            src={this.props.src}
            alt={this.props.src}
            className={styles.image}
            onLoad={this.imageLoadedHandler}
          />
        </div>
      </div>
    );
  }
}

export default ImageContainer;
