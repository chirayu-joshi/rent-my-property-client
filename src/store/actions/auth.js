import * as actionTypes from '../actions/actionTypes';

export const checkAuth = () =>{
  // localStorage calls are synchronous
  return {
    type: actionTypes.CHECK_AUTH,
    expiryTime: localStorage.getItem('expiryTime')
  }
}
