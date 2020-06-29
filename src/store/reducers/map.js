import * as actionTypes from '../actions/actionTypes';

const initialState = {
  location: { lat: 0, lon: 0 },
  zoom: 7,
  country: '',
  posts: [],
  originalPosts: []
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
    posts: action.posts,
    originalPosts: action.posts
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

const filterPosts = (state, action) => {
  const filters = action.filters;
  const filteredPosts = state.originalPosts.filter(post => {
    if (post.guestCapacity === filters.guestCapacity) {
      if (filters.propertyType) {
        if (post.propertyType !== filters.propertyType) {
          return false;
        }
      }
      if (filters.rangeValue[0] === 0 && filters.rangeValue[1] === 100) {
        return true;
      } else if (filters.rangeValue[0] === 0) {
        if (post.price >= filters.rangeValue[1] * 1000) {
          return false;
        }
      } else if (filters.rangeValue[1] === 100) {
        if (post.price <= filters.rangeValue[0] * 1000) {
          return false;
        }
      } else if (post.price <= filters.rangeValue[0] * 1000
        || post.price >= filters.rangeValue[1] * 1000) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  });
  return {
    ...state,
    posts: filteredPosts
  }
}

const resetPosts = (state, actions) => {
  return {
    ...state,
    posts: state.originalPosts
  }
}

const zoomLocation = (state, action) => {
  return {
    ...state,
    zoom: 15,
    location: { lat: action.location.lat, lon: action.location.lon }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOCATION_FROM_IP: return setLocationFromIP(state, action);
    case actionTypes.SET_COUNTRY_FROM_IP: return setCountryFromIP(state, action);
    case actionTypes.SET_COUNTRY_CODE_FROM_IP: return setCountryCodeFromIP(state, action);
    case actionTypes.SET_POSTS: return setPosts(state, action);
    case actionTypes.SORT_POSTS: return sortPosts(state, action);
    case actionTypes.FILTER_POSTS: return filterPosts(state, action);
    case actionTypes.RESET_POSTS: return resetPosts(state, action);
    case actionTypes.ZOOM_LOCATION: return zoomLocation(state, action);
    default: return state;
  }
}

export default reducer;
