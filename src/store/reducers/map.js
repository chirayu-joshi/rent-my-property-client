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

const setCountryCodeFromIP = (state, action) => {
  return {
    ...state,
    countryCode: action.countryCode
  }
}

const setPosts = (state, action) => {
  return {
    ...state,
    posts: action.posts
  }
}

const sortPosts = (state, action) => {
  const getStars = reviews => {
    if (reviews.length === 0) {
      return 0;
    } else {
      const totalReviews = reviews.length;
      let starSum = 0;
      reviews.forEach(review => {
        starSum += review.stars
      });
      return starSum / totalReviews;
    }
  }

  const posts = [...state.posts];
  if (action.by === 'price') {
    posts.sort((a, b) => (a.price > b.price) ? 1 : -1);
  } if (action.by === 'stars') {
    // In return statement, -1 : 1 because higher stars are better
    posts.sort((a, b) => (getStars(a.reviews) > getStars(b.reviews)) ? -1 : 1);
  } else if (action.by === 'guestCapacity') {
    posts.sort((a, b) => (a.guestCapacity > b.guestCapacity) ? 1 : -1);
  }
  return {
    ...state,
    posts: posts
  }
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOCATION_FROM_IP: return setLocationFromIP(state, action);
    case actionTypes.SET_COUNTRY_FROM_IP: return setCountryFromIP(state, action);
    case actionTypes.SET_COUNTRY_CODE_FROM_IP: return setCountryCodeFromIP(state, action);
    case actionTypes.SET_POSTS: return setPosts(state, action);
    case actionTypes.SORT_POSTS: return sortPosts(state, action);
    default: return state;
  }
}

export default reducer;
