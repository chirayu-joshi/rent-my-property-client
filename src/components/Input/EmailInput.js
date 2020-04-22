import React from 'react';

import styles from './Input.module.css';
import emailIcon from '../../assets/email.png';

const emailInput = props => (
  <div className={styles.inputContainer}>
    <div className={styles.inputIcon}>
      <img src={emailIcon} alt="email" className={styles.emailInput} />
    </div>
    <input
      className={styles.input}
      type="email"
      name="email"
      placeholder="Email"
      onChange={props.change}
      required />
  </div>
);

export default emailInput;
