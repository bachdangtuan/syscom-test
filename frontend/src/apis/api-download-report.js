import axios from 'axios';

const API_HOST = process.env.REACT_APP_DOWNLOAD_REPORT_API_HOST;

export function downloadDocxReport(reportData) {
  return axios.post(API_HOST + '/docx-export', reportData, {responseType: 'arraybuffer'});
}

export function downloadPdfReport(reportData) {
  return axios.post(API_HOST + '/pdf-export', reportData, {responseType: 'arraybuffer'});
}

export function downloadFullDocxReport(fullReportData) {
  return axios.post(API_HOST + '/full-docx-export', fullReportData, {responseType: 'arraybuffer'});
}
