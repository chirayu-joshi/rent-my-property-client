import axios from 'axios';
import secrets from './secret';

const axiosConfigs = (localStorage.getItem('token') === null) ? 
  {
    baseURL: secrets.baseURL,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  } : 
  {
    baseURL: secrets.baseURL,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json; charset=utf-8'
    }
  }

const instance = axios.create(axiosConfigs);

// instance.defaults.headers.common['Authorization'] = 'Bearer ' + configs.access_token;
// instance.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';

export default instance;
