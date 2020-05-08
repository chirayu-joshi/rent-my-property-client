import React from 'react';
import { IconButton } from '@material-ui/core';
import { AddCircleOutlineOutlined, RemoveCircleOutlineOutlined } from '@material-ui/icons';

import styles from './Counter.module.css';

const counter = props =>
  <div className={styles.container}>
    <p>{props.children}</p>
    <div className={styles.counter}>
      <h4>{props.title}</h4>
      <div className={styles.count}>
        <IconButton color="primary">
          <RemoveCircleOutlineOutlined fontSize="large" />
        </IconButton>
        {props.value}
        <IconButton color="primary">
          <AddCircleOutlineOutlined fontSize="large" />
        </IconButton>
      </div>
    </div>
  </div>

export default counter;
