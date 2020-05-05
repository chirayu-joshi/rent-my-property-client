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
      const data = {
        token: res.data.token,
        time: new Date().getTime()
      }
      localStorage.setItem('userTokenTime', JSON.stringify(data));
      console.log(JSON.parse(localStorage.getItem('userTokenTime')));
      dispatch(signInSuccess());
    }).catch(err => {
      console.log(err);
      dispatch(signInFailed());
    });
  }
}
