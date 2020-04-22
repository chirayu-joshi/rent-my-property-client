import React from 'react';

import styles from './BtnContainer.module.css';

const btnContainer = props => (
  <div className={styles.btnContainer}>
    {props.children}
  </div>
);

export default btnContainer;
