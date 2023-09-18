import axios from 'axios';

import {AuthenSubject} from 'services/authentication/authentication';

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(function(config) {
  // console.log('OUT: ', config);
  // const apiHost = 'https://usb.cyrax.io';
  // config.url = 
  return config;
}, function(err) {
  return Promise.reject(err);
});

axios.interceptors.response.use(function(response) {
  // console.log('IN: ', response);
  return response;
}, function(err) {
  if (
    err.response 
    && err.response.config.url !== '/api/check_auth'
    && err.response.status === 401 
  ) {
    setTimeout(() => {AuthenSubject.next()}, 0);
  }
  return Promise.reject(err);
});
