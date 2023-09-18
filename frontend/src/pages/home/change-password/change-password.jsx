import React, {Component} from 'react';
import {FormService} from '@tpacks/react-common-services';

import {changePassword} from 'apis/api-change-password';

import Spinner from 'components/spinner/spinner';

import './change-password.scss';

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      errorMessage: '',
    };
    this.changePasswordFormService = new FormService(this, {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDismissError = this.handleDismissError.bind(this);
  }

  getFormValues() {
    const oldPassword = this.changePasswordFormService.getValueOfField('oldPassword');
    const newPassword = this.changePasswordFormService.getValueOfField('newPassword');
    const newPasswordConfirm = this.changePasswordFormService.getValueOfField('newPasswordConfirm');
    return {oldPassword, newPassword, newPasswordConfirm};
  }

  resetForm() {
    this.changePasswordFormService.setValueForField('oldPassword', '');
    this.changePasswordFormService.setValueForField('newPassword', '');
    this.changePasswordFormService.setValueForField('newPasswordConfirm', '');
  }

  handleFormChange(field, value) {
    this.changePasswordFormService.setValueForField(field, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {oldPassword, newPassword, newPasswordConfirm} = this.getFormValues();
    if (newPassword === newPasswordConfirm) {
      this.callApiChangePassword({oldPassword, newPassword});
    } else {
      this.setState({errorMessage: 'Mật khẩu gõ lại không khớp'});
    }
  }

  async callApiChangePassword({oldPassword, newPassword}) {
    this.setState({submitting: true, errorMessage: ''});
    try {
      const response = await changePassword({oldPassword, newPassword});
      const {result} = response.data;
      if (result === 'success') {
        alert('Đã đổi mật khẩu thành công!');
        this.resetForm();
      } else {
        this.setState({errorMessage: 'Đổi mật khẩu không thành công'});
      }
    } catch (err) {
      this.setState({errorMessage: 'Đổi mật khẩu không thành công'});
      console.error(err);
    } finally {
      this.setState({submitting: false});
    }
  }

  handleDismissError() {
    this.setState({errorMessage: ''});
  }

  render() {
    const {submitting, errorMessage} = this.state;
    const {oldPassword, newPassword, newPasswordConfirm} = this.getFormValues();
    return (
      <div className="flex-container flex-dir-column app-change-password">
        <div className="change-password-box">
          <h3 className="text-center text-uppercase margin-top-1 margin-bottom-2">Đổi mật khẩu</h3>
          {
            errorMessage
              ? (
                <div className="margin-bottom-1 flex-container align-middle align-justify error">
                  <span>{errorMessage}</span>
                  <i className="fi-x dismiss" onClick={this.handleDismissError} />
                </div>
              ) : null
          }
          <form onSubmit={this.handleSubmit}>
            <input
              type="password"
              placeholder="Mật khẩu cũ"
              className="margin-bottom-1"
              value={oldPassword}
              onChange={(e) => {this.handleFormChange('oldPassword', e.target.value)}}
            />
            <input
              type="password"
              placeholder="Mật khẩu mới"
              className="margin-bottom-1"
              value={newPassword}
              onChange={(e) => {this.handleFormChange('newPassword', e.target.value)}}
            />
            <input
              type="password"
              placeholder="Gõ lại mật khẩu mới"
              className="margin-bottom-2"
              value={newPasswordConfirm}
              onChange={(e) => {this.handleFormChange('newPasswordConfirm', e.target.value)}}
            />
            <button 
              type="submit"
              className={`button primary expanded ${submitting ? 'disabled' : ''}`}
            >
              {
                submitting ? <span><Spinner />&nbsp;&nbsp;</span> : null
              }
              Cập nhật mật khẩu
            </button>
          </form>
        </div>
      </div>
    );
  }
}
