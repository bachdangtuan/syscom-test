import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './footer.scss';

class Footer extends Component {
  render() {
    return (
      <footer className="grid-x app-footer">
        <div 
          className="
            cell 
            large-4 large-offset-4 
            medium-6 medium-offset-3 
            small-10 small-offset-1 
            margin-bottom-2 text-center links
          "
        >
          <div className="flex-container align-justify limit">
            <Link to="/intro">Giới thiệu</Link>
            <Link to="/guide">Hướng dẫn</Link>
            <Link to="/contact">Liên hệ</Link>
          </div>
        </div>
        <div className="
            cell 
            large-4 large-offset-4 
            medium-6 medium-offset-3 
            small-10 small-offset-1 
            flex-container align-center 
            margin-bottom-2 buttons
        ">
          <span className="footer-button">S</span>
          <span className="margin-left-2 footer-button">Y</span>
          <span className="margin-left-2 footer-button">S</span>
          <span className="margin-left-2 footer-button">C</span>
          <span className="margin-left-2 footer-button">O</span>
          <span className="margin-left-2 footer-button">M</span>
        </div>
        <div className="
            cell 
            large-4 large-offset-4 
            medium-6 medium-offset-3 
            small-10 small-offset-1 
            text-center copyright
        ">
          Toà Án Nhân Dân Tối Cao
        </div>
      </footer>
    );
  }
}

export default Footer;
