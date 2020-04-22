import React from 'react';

import styles from './Input.module.css';
import passwordIcon from '../../assets/password.png';

const emailInput = props => (
  <div className={styles.inputContainer}>
    <div className={styles.inputIcon}>
      <img src={passwordIcon} alt="password" className={styles.passwordInput} />
    </div>
    <input
      className={styles.input}
      type="password"
      name="password"
      placeholder="Password"
      onChange={props.change}
      required />
  </div>
);

export default emailInput;
