import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: true,
  signUpFailed: false,
  signUpSuccessful: false
}

const signUpStart = (state, action) => {
  return {
    ...state,
    isLoading: true
  }
}

const signUpSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    signUpSuccessful: true
  }
}

const signUpFailed = (state, action) => {
  return {
    ...state,
    isLoading: false,
    signUpFailed: true
  }
}

const imageLoadedSignUp = (state, action) => {
  return {
    ...state,
    isLoading: false
  }
}

const clearSignUpState = (state, action) => {
  return {
    ...state,
    isLoading: true,
    signUpSuccessful: false,
    signUpFailed: false
  }
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_START: return signUpStart(state, action);
    case actionTypes.SIGNUP_SUCCESS: return signUpSuccess(state, action);
    case actionTypes.SIGNUP_FAILED: return signUpFailed(state, action);
    case actionTypes.IMAGE_LOADED_SIGNUP: return imageLoadedSignUp(state, action);
    case actionTypes.CLEAR_SIGNUP_STATE: return clearSignUpState(state, action);
    default:
      return state;
  }
}

export default reducer;
