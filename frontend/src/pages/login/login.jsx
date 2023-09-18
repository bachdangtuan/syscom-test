import React, {Component} from 'react';

import {AuthenSubject} from 'services/authentication/authentication';

import Spinner from 'components/spinner/spinner';
import Footer from 'components/footer/footer';

import './login.scss';
import logo from 'assets/images/logo_img.png';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitting: false,
      errored: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDismissError = this.handleDismissError.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {username, password} = this.state;
    this.setState({submitting: true, errored: false});
    AuthenSubject.doLogin({username, password})
      .then((response) => {
        if (response.data && response.data.result !== 'success') {
          this.setState({errored: true});
        }
      })
      .catch((err) => {
        this.setState({errored: true});
        console.error(err);
      })
      .finally(() => {
        this.setState({submitting: false});
      });
  }

  handleDismissError() {
    this.setState({errored: false});
  }

  render() {
    const {username, password, submitting, errored} = this.state;
    return (
      <>
        <div className="app-login-background" />
        <div className="flex-container flex-dir-column app-login">
        <img src={logo} width={150} height={150} style={{ alignSelf: 'center' }}/>
          <div className="shadow login-box">
            <h3 className="text-center text-uppercase margin-top-1 margin-bottom-2">Đăng nhập</h3>
            {
              errored
                ? (
                  <div className="margin-bottom-1 flex-container align-middle align-justify error">
                    <span>Đăng nhập không thành công</span>
                    <i className="fi-x dismiss" onClick={this.handleDismissError} />
                  </div>
                ) : null
            }
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => {this.setState({username: e.target.value})}}
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="margin-bottom-2"
                value={password}
                onChange={(e) => {this.setState({password: e.target.value})}}
              />
              <button 
                type="submit"
                className={`button primary expanded ${submitting ? 'disabled' : ''}`}
              >
                {
                  submitting ? <span><Spinner />&nbsp;&nbsp;</span> : null
                }
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
