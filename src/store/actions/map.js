import axios from 'axios';

import * as actionTypes from './actionTypes';
import secrets from '../../secret';

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

export const setPosts = posts => {
  return {
    type: actionTypes.SET_POSTS,
    posts: posts
  }
}

export const fetchPostsByCountryCode = countryCode => {
  return dispatch => {
    axios
      .get(secrets.baseURL + '/api/stay/posts/' + countryCode)
      .then(res => {
        dispatch(setPosts(res.data.posts));
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const initLocation = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios
        .get('http://ip-api.com/json')
        .then(res => {
          dispatch(setLocationFromIP({ lat: res.data.lat, lon: res.data.lon }));
          dispatch(setCountryFromIP(res.data.country));
          resolve(res.data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
}
