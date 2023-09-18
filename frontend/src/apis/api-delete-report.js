import axios from 'axios';

export function deleteReport(id) {
  return axios.get(`/api/delete-report/${id}`);
}
