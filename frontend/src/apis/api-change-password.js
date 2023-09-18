import axios from 'axios';

export function changePassword({oldPassword, newPassword}) {
  return axios.post('/api/changepass', {
    password: oldPassword, 
    new_password: newPassword,
  });
}
