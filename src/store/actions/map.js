import axios from '../../axios';

import * as actionTypes from './actionTypes';

export const setLocationFromIP = location => {
  return {
    type: actionTypes.SET_LOCATION_FROM_IP,
    location: location
  }
}

export const setCountryFromIP = country => {
  return {
    type: actionTypes.SET_COUNTRY_FROM_IP,
    country: country
  }
}

export const setCountryCodeFromIP = countryCode => {
  return {
    type: actionTypes.SET_COUNTRY_CODE_FROM_IP,
    countryCode: countryCode
  }
}

export const setPosts = posts => {
  return {
    type: actionTypes.SET_POSTS,
    posts: posts
  }
}

export const fetchPostsByCountryCode = countryCode => {
  return dispatch => {
    axios
      .get('/api/stay/posts/' + countryCode)
      .then(res => {
        dispatch(setPosts(res.data.posts));
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const sortPosts = by => {
  return {
    type: actionTypes.SORT_POSTS,
    by: by
  }
}

export const initLocation = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/stay/position')
        .then(res => {
          dispatch(setLocationFromIP({ lat: res.data.latitude, lon: res.data.longitude }));
          dispatch(setCountryFromIP(res.data.country_name));
          dispatch(setCountryCodeFromIP(res.data.country_code));
          resolve(res.data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
}
