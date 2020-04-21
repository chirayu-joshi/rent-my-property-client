import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.module.css';
import logoImg from '../../assets/logo/logo.png';

const logo = props => (
  <Link to="/">
    <img className={styles.logo}
      src={logoImg}
      alt="logo" />
  </Link>
);

export default logo;
