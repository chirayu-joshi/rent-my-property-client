import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';

import InfoModal from '../../components/InfoModal/InfoModal';
import EmailInput from '../../components/Input/EmailInput';
import PasswordInput from '../../components/Input/PasswordInput';
import ButtonContainer from '../../components/Input/BtnContainer/BtnContainer';

import Logo from '../../components/Logo/Logo';
import styles from './Form.module.css';
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
      <div className={styles.container}>
        <InfoModal loading={this.state.isLoading} type="loading">Loading...</InfoModal>
        <InfoModal loading={this.state.loginFailed} type="error">Incorrect email or password</InfoModal>
        <div className={styles.imageContainer}>
          <Logo />
          <img
            className={styles.mainImg}
            src={mainImg}
            alt="house"
            onLoad={() => this.setState({ isLoading: false })} />
        </div>
        <form>
          <h1 className={styles.mainHeading}>
            Welcome to <span>Rent My Property</span>
          </h1>
          <p className={styles.tagLine}>Find easy rents near you</p>
          <hr className={styles.shortLine} />
          <div className={styles.inputContainer}>
            <EmailInput change={this.inputChangeHandler} />
            <PasswordInput change={this.inputChangeHandler} />
          </div>
          <ButtonContainer>
            <button onClick={this.onSubmitHandler} type="button">Sign In</button>
            <Link to="/signUp">Sign Up</Link>
          </ButtonContainer>
        </form>
      </div>
    );
  }
}

export default SignIn;
