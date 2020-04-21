import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';

import configs from '../../configs';

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
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
      axios.post('/api/signUp', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email.toLowerCase(),
        password: this.state.password
      }).then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      });
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
            : 'First Name should only have characters from "A to Z" or "a to z"';
        break;
      case 'lastname':
        errors.lastname =
          configs.name_regex.test(value)
            ? ''
            : 'Last Name should only have characters from "A to Z" or "a to z"';
        break;
      case 'email':
        errors.email =
          configs.email_regex.test(value)
            ? ''
            : 'Invalid email';
        break;
      case 'password':
        errors.password =
          configs.password_regex.test(value)
            ? ''
            : 'Password should have 1 uppercase, 1 lowercase, 1 digit, 1 special symbol, min 8 length';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  render() {
    return (
      <form>
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          onChange={this.inputChangeHandler}
          required />
        <p>{this.state.errors.firstname ? this.state.errors.firstname : ''}</p>
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          onChange={this.inputChangeHandler}
          required />
        <p>{this.state.errors.lastname ? this.state.errors.lastname : ''}</p>
        <input
          type="email"
          name="email"
          placeholder="example@domain.com"
          onChange={this.inputChangeHandler}
          required />
        <p>{this.state.errors.email ? this.state.errors.email : ''}</p>
        <input
          type="password"
          name="password"
          placeholder="********"
          onChange={this.inputChangeHandler}
          required />
        <p>{this.state.errors.password ? this.state.errors.password : ''}</p>
        <button onClick={this.onSubmitHandler} type="button">Sign Up</button>
        <Link to="/signIn">Sign In</Link>
      </form>
    );
  }
}

export default SignUp;
