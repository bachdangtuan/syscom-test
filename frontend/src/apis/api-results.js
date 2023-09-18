import axios from 'axios';

export function getResults(id) {
  return axios.get(`/api/show-report/${id}`);
}

export function getFullReportData(id) {
  return axios.get(`/api/show-report-full/${id}`);
}
