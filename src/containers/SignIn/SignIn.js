import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';

import styles from './SignIn.module.css';
import logo from '../../assets/logo/logo.png';
import emailIcon from '../../assets/email.png';
import passwordIcon from '../../assets/password.png';
import mainImg from '../../assets/houses_buildings/16.jpeg';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  onSubmitHandler = () => {
    axios.post('/api/signIn', {
      email: this.state.email.toLowerCase(),
      password: this.state.password
    }).then(res => {
      const data = {
        token: res.data.token,
        time: new Date().getTime()
      }
      localStorage.setItem('userTokenTime', JSON.stringify(data));
      console.log(JSON.parse(localStorage.getItem('userTokenTime')));
    }).catch(err => {
      console.log(err);
    });
  }

  inputChangeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className={styles.container} ref={this.wrapper}>
        <div className={styles.imageContainer}>
          <img className={styles.logo}
            src={logo}
            alt="logo" />
          <img
            className={styles.mainImg}
            src={mainImg}
            alt="house" />
        </div>
        <form>
          <h1 className={styles.mainHeading}>
            Welcome to <span>Rent My Property</span>
          </h1>
          <p className={styles.tagLine}>Find easy rents near you</p>
          <hr className={styles.shortLine} />
          <div className={styles.inputContainer}>
            <div className={styles.input}>
              <div className={styles.inputIcon}>
                <img src={emailIcon} alt="email" className={styles.emailInput} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.inputChangeHandler} />
            </div>
            <div className={styles.input}>
              <div className={styles.inputIcon}>
                <img src={passwordIcon} alt="password" className={styles.passwordInput} />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.inputChangeHandler} />
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button onClick={this.onSubmitHandler} type="button">Sign In</button>
            <Link to="/signUp">Sign Up</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
