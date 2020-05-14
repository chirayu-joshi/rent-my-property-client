import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

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
    password: ''
  }

  onSubmitHandler = () => {
    this.props.onSignIn(this.state.email, this.state.password);
  }

  inputChangeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    if (this.props.signInSuccessful) {
      this.props.onClearSignInState();
      return <Redirect to="/" />
    }
    return (
      <div className={styles.container}>
        <InfoModal loading={this.props.isLoading} type="loading">Loading...</InfoModal>
        <InfoModal loading={this.props.signInFailed} type="error">Incorrect email or password</InfoModal>
        <Logo />
        <div className={styles.imageContainer}>
          <img
            className={styles.mainImg}
            src={mainImg}
            alt="house"
            onLoad={() => this.props.onImageLoaded()} />
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

const mapStateToProps = state => {
  return {
    isLoading: state.signIn.isLoading,
    signInFailed: state.signIn.signInFailed,
    signInSuccessful: state.signIn.signInSuccessful
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: (email, password) => dispatch(actions.signIn(email, password)),
    onImageLoaded: () => dispatch(actions.imageLoadedsignIn()),
    onClearSignInState: () => dispatch(actions.clearSignInState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
