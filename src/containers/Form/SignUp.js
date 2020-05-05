import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import configs from '../../configs';

import InfoModal from '../../components/InfoModal/InfoModal';
import FirstNameInput from '../../components/Input/FirstNameInput';
import LastNameInput from '../../components/Input/LastNameInput';
import EmailInput from '../../components/Input/EmailInput';
import PasswordInput from '../../components/Input/PasswordInput';
import ButtonContainer from '../../components/Input/BtnContainer/BtnContainer';

import Logo from '../../components/Logo/Logo';
import styles from './Form.module.css';
import mainImg from '../../assets/stairs.jpeg';

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(
    val => val.length > 0 && (valid = false)
  );
  return valid;
}

class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    errors: {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  }

  onSubmitHandler = () => {
    if (validateForm(this.state.errors)) {
      console.log(this.state);
      this.props.onSignUp(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
    } else {
      console.log('Invalid form');
    }
  }

  inputChangeHandler = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'firstname':
        errors.firstname =
          configs.name_regex.test(value)
            ? ''
            : 'First Name should only have characters from "A to Z" or "a to z". ';
        break;
      case 'lastname':
        errors.lastname =
          configs.name_regex.test(value)
            ? ''
            : 'Last Name should only have characters from "A to Z" or "a to z". ';
        break;
      case 'email':
        errors.email =
          configs.email_regex.test(value)
            ? ''
            : 'Invalid email. ';
        break;
      case 'password':
        errors.password =
          configs.password_regex.test(value)
            ? ''
            : 'Password should have 1 uppercase, 1 lowercase, 1 digit, 1 special symbol, min 8 length. ';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  render() {
    let infoModal = null;
    let errorMessage = '';
    Object.values(this.state.errors).forEach(error => {
      errorMessage += error;
    });
    if (errorMessage !== '') {
      infoModal = <InfoModal loading={errorMessage !== ''} type="info">{errorMessage}</InfoModal>
    }
    if (this.props.signUpSuccessful) {
      this.props.onClearSignUpState();
      return <Redirect to="/signIn" />
    }
    return (
      <div className={styles.container}>
        <InfoModal loading={this.props.isLoading} type="loading">Loading...</InfoModal>
        {infoModal}
        <InfoModal loading={this.props.signUpFailed} type="error">Sign Up Failed</InfoModal>
        <form>
          <h1 className={styles.mainHeading}>
            Welcome to <span>Rent My Property</span>
          </h1>
          <p className={styles.tagLine}>Where luxury meets price</p>
          <hr className={styles.shortLine} />
          <div style={{ marginTop: '100px' }}>
            <FirstNameInput change={this.inputChangeHandler} />
            <LastNameInput change={this.inputChangeHandler} />
            <EmailInput change={this.inputChangeHandler} />
            <PasswordInput change={this.inputChangeHandler} />
          </div>
          <ButtonContainer>
            <button onClick={this.onSubmitHandler} type="button">Sign Up</button>
            <Link to="/signIn">Sign In</Link>
          </ButtonContainer>
        </form>
        <div className={styles.imageContainer}>
          <Logo />
          <img
            className={styles.mainImg}
            src={mainImg}
            alt="house"
            onLoad={() => this.props.onImageLoaded()} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.signUp.isLoading,
    signUpFailed: state.signUp.signUpFailed,
    signUpSuccessful: state.signUp.signUpSuccessful
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (firstName, lastName, email, password) => dispatch(actions.signUp(firstName, lastName, email, password)),
    onImageLoaded: () => dispatch(actions.imageLoadedSignUp()),
    onClearSignUpState: () => dispatch(actions.clearSignUpState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
