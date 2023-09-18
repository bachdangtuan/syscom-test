import axios from 'axios';

export function uploadRuleLinux({file}) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    'x-token': 'eyJhbGciOiJIUzI1NiIsImV4cCI6MTYwOTQwMjMzMSwiaXNzIjoiY3ljcmFjay5pbyIsInN1YiI6InRvbSIsInR5cCI6IkpXVCJ9.e30.v5bHIAyIrjkNBaZcbHdkKbEXvp1frmHQQGg5zqjXmVk',
  };
  const formData = new FormData();
  formData.set('file', file);
  return axios.post('/api/upload-script/linux', formData, {headers});
}

export function uploadRuleWindows({file}) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    'x-token': 'eyJhbGciOiJIUzI1NiIsImV4cCI6MTYwOTQwMjMzMSwiaXNzIjoiY3ljcmFjay5pbyIsInN1YiI6InRvbSIsInR5cCI6IkpXVCJ9.e30.v5bHIAyIrjkNBaZcbHdkKbEXvp1frmHQQGg5zqjXmVk',
  };
  const formData = new FormData();
  formData.set('file', file);
  return axios.post('/api/upload-script/windows', formData, {headers});
}
