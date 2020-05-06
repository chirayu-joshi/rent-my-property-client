import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false
}

const checkAuth = (state, action) => {
  if (action.expiryTime !== null && new Date().getTime() / 1000 - action.expiryTime < 3600) {
    return {
      ...state,
      isAuthenticated: true
    }
  } else if (action.expiryTime !== null) {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('expiryTime');
  }
  return {
    ...state,
    isAuthenticated: false
  }
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECK_AUTH: return checkAuth(state, action);
    default:
      return state;
  }
}

export default reducer;
