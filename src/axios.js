import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8888',
});

instance.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer '.concat(window.localStorage.getItem('token'));
  // config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;