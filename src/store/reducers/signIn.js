import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: true,
  signInFailed: false,
  signInSuccessful: false
}

const signInStart = (state, action) => {
  return {
    ...state,
    isLoading: true
  }
}

const signInSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    signInSuccessful: true
  }
}

const signInFailed = (state, action) => {
  return {
    ...state,
    isLoading: false,
    signInFailed: true
  }
}

const imageLoadedSignIn = (state, action) => {
  return {
    ...state,
    isLoading: false
  }
}

const clearSignInState = (state, action) => {
  return {
    ...state,
    isLoading: true,
    signInSuccessful: false,
    signInFailed: false
  }
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_START: return signInStart(state, action);
    case actionTypes.SIGNIN_SUCCESS: return signInSuccess(state, action);
    case actionTypes.SIGNIN_FAILED: return signInFailed(state, action);
    case actionTypes.IMAGE_LOADED_SIGNIN: return imageLoadedSignIn(state, action);
    case actionTypes.CLEAR_SIGNIN_STATE: return clearSignInState(state, action);
    default:
      return state;
  }
}

export default reducer;
