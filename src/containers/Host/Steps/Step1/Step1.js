import React, { Component } from 'react';

import styles from '../Steps.module.css';
import ProgressNavbar from '../../../ProgressNavbar/ProgressNavbar';

class Step1 extends Component {
  render() {
    return (
      <div className={styles.container}>
        <ProgressNavbar>Step 1: Start with basics</ProgressNavbar>
      </div>
    );
  }
}

export default Step1;
