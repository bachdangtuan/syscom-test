import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './topbar-noauthen.scss';

class TopbarNoauthen extends Component {
  render() {
    return (
      <div className="flex-container align-middle align-justify shadow app-topbar-noauthen">
        <Link to="/">
          <h5 className="app-title">SYSCOM</h5>
        </Link>
        <div className="margin-left-1 height-100 flex-container">
          <Link to="/login">
            <button 
              type="button" 
              className="primary button margin-0"
            >
              Đăng nhập
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default TopbarNoauthen;
