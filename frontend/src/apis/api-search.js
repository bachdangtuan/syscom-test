import axios from 'axios';
import {stringify} from 'qs';

export function searchReport({q, from}) {
  return axios.get(`/api/search?${stringify({q, from})}`);
}
