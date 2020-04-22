import React from 'react';

import styles from './Input.module.css';
import personIcon from '../../assets/person.png';

const firstNameInput = props => (
  <div className={styles.inputContainer}>
    <div className={styles.inputIcon}>
      <img src={personIcon} alt="firstName" className={styles.nameInput} />
    </div>
    <input
      className={styles.input}
      type="text"
      name="firstname"
      placeholder="First name"
      onChange={props.change}
      required />
  </div>
);

export default firstNameInput;
