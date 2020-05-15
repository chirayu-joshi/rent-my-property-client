import * as actionTypes from '../actions/actionTypes';

const initialState = {
  location: { lat: 0, lon: 0 },
  zoom: 7,
  country: '',
  posts: []
}

const setLocationFromIP = (state, action) => {
  return {
    ...state,
    location: {
      lat: action.location.lat,
      lon: action.location.lon
    }
  }
}

const setCountryFromIP = (state, action) => {
  return {
    ...state,
    country: action.country
  }
}

const setPosts = (state, action) => {
  return {
    ...state,
    posts: action.posts
  }
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOCATION_FROM_IP: return setLocationFromIP(state, action);
    case actionTypes.SET_COUNTRY_FROM_IP: return setCountryFromIP(state, action);
    case actionTypes.SET_POSTS: return setPosts(state, action);
    default: return state;
  }
}

export default reducer;
