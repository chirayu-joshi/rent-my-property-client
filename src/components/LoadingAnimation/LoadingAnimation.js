import React from 'react';

import styles from './LoadingAnimation.module.css';

const loadingAnimation = props => (
  <div className={styles.animationContainer}>
    <div className={styles.animation}>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default loadingAnimation;
