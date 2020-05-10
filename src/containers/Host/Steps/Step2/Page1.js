import React, { Component } from 'react';

import styles from '../Steps.module.css';
import InputImage from '../../../InputImage/InputImage';

class Page1 extends Component {
  render() {
    return (
      <div className={styles.page}>
        <h1>Add photos to your listing</h1>
        <p>Photos help guests imagine staying in your place.</p>

        <InputImage reqLink="/api/host/step2/propertyImage" />
      </div>
    );
  }
}

export default Page1;
