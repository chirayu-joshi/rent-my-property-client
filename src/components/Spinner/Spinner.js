import React from 'react';

import styles from './Spinner.module.css';

const spinner = props => 
  <div className={styles.spinner}>
    <div className={styles.innerClass}>
      <div></div>
    </div>
  </div>

export default spinner;