import axios from '../../axios';

import * as actionTypes from './actionTypes';

export const signUpStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  }
}

export const signUpSuccess = () => {
  return {
    type: actionTypes.SIGNUP_SUCCESS
  }
}

export const signUpFailed = error => {
  return {
    type: actionTypes.SIGNUP_FAILED,
    error: error
  }
}

export const imageLoadedSignUp = () => {
  return {
    type: actionTypes.IMAGE_LOADED_SIGNUP
  }
}

export const clearSignUpState = () => {
  return {
    type: actionTypes.CLEAR_SIGNUP_STATE
  }
}

export const signUp = (firstName, lastName, email, password) => {
  return dispatch => {
    dispatch(signUpStart());

    axios.post('/api/signUp', {
      firstName: firstName,
      lastName: lastName,
      email: email.toLowerCase(),
      password: password
    }).then(res => {
      console.log(res.data);
      dispatch(signUpSuccess());
    }).catch(err => {
      dispatch(signUpFailed(err));
    });
  }
}
