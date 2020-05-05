import React from 'react';

import styles from './Input.module.css';
import personIcon from '../../assets/person.png';

const lastNameInput = props => (
  <div className={styles.inputContainer}>
    <div className={styles.inputIcon}>
      <img src={personIcon} alt="lastName" className={styles.nameInput} />
    </div>
    <input
      className={styles.input}
      type="text"
      name="lastName"
      placeholder="Last name"
      onChange={props.change}
      required />
  </div>
);

export default lastNameInput;
