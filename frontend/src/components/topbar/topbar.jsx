import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import {AuthenSubject} from 'services/authentication/authentication';
import {ManagerThemeSubject, THEMES} from 'services/managers/manager-theme';

import './topbar.scss';

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      isInLightMode: ManagerThemeSubject.getThemeName() === THEMES.light,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSwitchTheme = this.handleSwitchTheme.bind(this);
    this.subscriptions = [];
  }

  componentDidMount() {
    this.subscriptions.push(
      ManagerThemeSubject.subscribe(() => {
        this.setState({isInLightMode: ManagerThemeSubject.getThemeName() === THEMES.light});
      }),
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.search && this.props.search && prevProps.search !== this.props.search) {
      this.setState({searchString: this.props.search});
    }
  }

  componentWillUnmount() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  getSwitchThemeButtonTitleByTheme() {
    if (this.state.isInLightMode) {
      return 'Chế độ Tối';
    }
    return 'Chế độ Sáng';
  }

  handleSearchChange(e) {
    e.preventDefault();
    this.props.onSearchChange(this.state.searchString);
  }

  handleLogout() {
    AuthenSubject.doLogout();
  }

  handleSwitchTheme() {
    const newTheme = (ManagerThemeSubject.getThemeName() === THEMES.light)
      ? THEMES.brown 
      : THEMES.light;
    ManagerThemeSubject.switchToTheme(newTheme);
  }

  render() {
    const {searchString, isInLightMode} = this.state;
    return (
      <div className="flex-container align-middle align-justify shadow app-topbar">
        <form 
          className="flex-child-auto flex-container align-middle left" 
          onSubmit={this.handleSearchChange}
        >
          <span className="margin-left-1 margin-right-1">
            <i className="fi-flag icon" />
          </span>
          <input 
            type="text"
            placeholder="Xem báo cáo với ID"
            className="flex-child-auto margin-0 search-input"
            value={searchString}
            onChange={(e) => {this.setState({searchString: e.target.value})}}
          />
          <button type="submit" style={{display: 'none'}} />
        </form>
        <div className="margin-left-1 height-100 flex-container">
          <NavLink to="/home/overview" activeClassName="active">
            <button 
              type="button" 
              title="Tổng quan"
              className="clear secondary button margin-0"
            >
              <i className="fi-graph-pie icon" />
            </button>
          </NavLink>
          <NavLink to="/home/search" activeClassName="active">
            <button 
              type="button" 
              title="Tìm kiếm"
              className="clear secondary button margin-0"
            >
              <i className="fi-magnifying-glass icon" />
            </button>
          </NavLink>
          <NavLink to="/home/upload-report" activeClassName="active">
            <button 
              type="button" 
              title="Tải lên báo cáo"
              className="clear secondary button margin-0"
            >
              <svg viewBox="0 0 384 512" width="14" height="18.5">
                <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path>
              </svg>
            </button>
          </NavLink>
          <NavLink to="/home/upload-rule" activeClassName="active">
            <button 
              type="button" 
              title="Tải lên tập luật"
              className="clear secondary button margin-0"
            >
              <svg viewBox="0 0 384 512" width="14" height="18.5">
                <path fill="currentColor" d="M384 121.941V128H256V0h6.059c6.365 0 12.47 2.529 16.971 7.029l97.941 97.941A24.005 24.005 0 0 1 384 121.941zM248 160c-13.2 0-24-10.8-24-24V0H24C10.745 0 0 10.745 0 24v464c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V160H248zM123.206 400.505a5.4 5.4 0 0 1-7.633.246l-64.866-60.812a5.4 5.4 0 0 1 0-7.879l64.866-60.812a5.4 5.4 0 0 1 7.633.246l19.579 20.885a5.4 5.4 0 0 1-.372 7.747L101.65 336l40.763 35.874a5.4 5.4 0 0 1 .372 7.747l-19.579 20.884zm51.295 50.479l-27.453-7.97a5.402 5.402 0 0 1-3.681-6.692l61.44-211.626a5.402 5.402 0 0 1 6.692-3.681l27.452 7.97a5.4 5.4 0 0 1 3.68 6.692l-61.44 211.626a5.397 5.397 0 0 1-6.69 3.681zm160.792-111.045l-64.866 60.812a5.4 5.4 0 0 1-7.633-.246l-19.58-20.885a5.4 5.4 0 0 1 .372-7.747L284.35 336l-40.763-35.874a5.4 5.4 0 0 1-.372-7.747l19.58-20.885a5.4 5.4 0 0 1 7.633-.246l64.866 60.812a5.4 5.4 0 0 1-.001 7.879z"></path>
              </svg>
            </button>
          </NavLink>
          <NavLink to="/home/change-password" activeClassName="active">
            <button 
              type="button" 
              title="Đổi mật khẩu"
              className="clear secondary button margin-0"
            >
              <i className="fi-key icon" />
            </button>
          </NavLink>
          <button 
            type="button" 
            title={this.getSwitchThemeButtonTitleByTheme()}
            className="clear primary button margin-0"
            onClick={this.handleSwitchTheme}
          >
            <SwitchThemeButtonIcon isInLightMode={isInLightMode} />
          </button>
          <button 
            type="button" 
            title="Đăng xuất"
            className="secondary button margin-0"
            onClick={this.handleLogout}
          >
            <i className="fi-arrow-right icon" />
          </button>
        </div>
      </div>
    );
  }
}

function SwitchThemeButtonIcon({isInLightMode}) {
  if (isInLightMode) {
    return (
      <svg viewBox="0 0 512 512" width="16" height="16">
        <path fill="currentColor" d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 512 512" width="16" height="16">
      <path fill="currentColor" d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path>
    </svg>
  );

}

Topbar.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default withRouter(Topbar);
