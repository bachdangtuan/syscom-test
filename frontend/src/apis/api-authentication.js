import axios from 'axios';

export function login({username, password}) {
  return axios.post('/api/login', {username, password});
}

export function logout() {
  return axios.get('/api/logout');
}

export function checkAuthen() {
  return axios.get('/api/check_auth');
}
