import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import {HOME_ROUTES} from './home-routes';

import Topbar from 'components/topbar/topbar';
import Footer from 'components/footer/footer';

import './home.scss';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(newSearch) {
    this.props.history.push(`/home/results/${newSearch}`);
  }

  render() {
    const {search} = this.state;
    return (
      <>
        <Topbar search={search} onSearchChange={this.handleSearchChange} />
        <div className="app-home-body">
          <Switch>
            {
              HOME_ROUTES.map((route) => (
                <Route 
                  key={route.path}
                  path={route.path} 
                  exact={route.exact} 
                  component={route.component} 
                />
              ))
            }
          </Switch>
        </div>
        <Footer />
      </>
    );
  }
}
