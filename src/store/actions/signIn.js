import axios from '../../axios';

import * as actionTypes from './actionTypes';

export const signInStart = () => {
  return {
    type: actionTypes.SIGNIN_START
  }
}

export const signInSuccess = () => {
  return {
    type: actionTypes.SIGNIN_SUCCESS
  }
}

export const signInFailed = error => {
  return {
    type: actionTypes.SIGNIN_FAILED,
    error: error
  }
}

export const imageLoadedsignIn = () => {
  return {
    type: actionTypes.IMAGE_LOADED_SIGNIN
  }
}

export const clearSignInState = () => {
  return {
    type: actionTypes.CLEAR_SIGNIN_STATE
  }
}

export const signIn = (email, password) => {
  return dispatch => {
    dispatch(signInStart());

    axios.post('/api/signIn', {
      email: email.toLowerCase(),
      password: password
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      const tokenDetails = JSON.parse(window.atob(res.data.token.split('.')[1]));
      /* 
        tokenDetails = {
          email: "chirayu@gmail.com"
          exp: 1588685136
          firstName: "chirayu"
          iat: 1588681536
          lastName: "joshi"
          userId: "5e9e106d7b3dc369d47cd929"
        }
      */
      localStorage.setItem('email', tokenDetails['email']);
      localStorage.setItem('firstName', tokenDetails['firstName']);
      localStorage.setItem('lastItem', tokenDetails['lastName']);
      localStorage.setItem('expiryTime', tokenDetails['exp']);
      dispatch(signInSuccess());
    }).catch(err => {
      console.log(err);
      dispatch(signInFailed());
    });
  }
}
