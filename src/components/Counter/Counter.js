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
        {props.value <= props.minValue ?
          <IconButton disabled>
            <RemoveCircleOutlineOutlined fontSize="large" />
          </IconButton> :
          <IconButton color="primary" onClick={props.subtract}>
            <RemoveCircleOutlineOutlined fontSize="large" />
          </IconButton>
        }
        <span className={styles.value}>{props.value}</span>
        <IconButton color="primary" onClick={props.add}>
          <AddCircleOutlineOutlined fontSize="large" />
        </IconButton>
      </div>
    </div>
  </div>

export default counter;
