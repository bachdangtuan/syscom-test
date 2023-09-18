import {Subject} from 'rxjs';

import {login, logout, checkAuthen} from 'apis/api-authentication';

const CACHE_TIME = 1 * 1000;

class AuthenticationSubject extends Subject {
  constructor(...anything) {
    super(...anything);
    this.authenInfo = {
      isLoggedIn: false,
      expireTime: 0,
    };
  }

  async doLogin({username, password}) {
    try {
      const response = await login({username, password});
      setTimeout(() => {this.next()}, 0);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async doLogout() {
    try {
      const response = await logout();
      setTimeout(() => {this.next()}, 0);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async isLoggedIn() {
    if (Date.now() < this.authenInfo.expireTime) {
      return this.authenInfo.isLoggedIn;
    } else {
      try {
        await checkAuthen();
        this.authenInfo = {isLoggedIn: true, expireTime: Date.now() + CACHE_TIME};
        return true;
      } catch (err) {
        this.authenInfo = {isLoggedIn: false, expireTime: Date.now() + CACHE_TIME};
        return false;
      }
    }
  }
}

export const AuthenSubject = new AuthenticationSubject();
