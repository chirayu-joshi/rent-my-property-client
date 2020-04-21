import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';

import InfoModal from '../../components/InfoModal/InfoModal';

import Logo from '../../components/Logo/Logo';
import styles from './SignIn.module.css';
import emailIcon from '../../assets/email.png';
import passwordIcon from '../../assets/password.png';
import mainImg from '../../assets/houses_buildings/16.jpeg';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    isLoading: true,
    loginFailed: false
  }

  onSubmitHandler = () => {
    this.setState({
      isLoading: true
    });
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
      this.setState({
        loginFailed: false,
        isLoading: false
      });
    }).catch(err => {
      console.log(err);
      this.setState({
        loginFailed: true
      });
    });
  }

  inputChangeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className={styles.container} ref={this.wrapper}>
        <InfoModal loading={this.state.isLoading}>Loading...</InfoModal>
        <InfoModal loading={this.state.loginFailed}>Incorrect email or password</InfoModal>
        <div className={styles.imageContainer}>
          <Logo />
          <img
            className={styles.mainImg}
            src={mainImg}
            alt="house"
            onLoad={() => this.setState({isLoading: false})} />
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
