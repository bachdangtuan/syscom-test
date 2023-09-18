import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import {APP_ROUTES} from './app-routes';
import {ThemeContext} from './contexts/context-theme';
import {ManagerThemeSubject} from './services/managers/manager-theme';

import './app.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeConfig: ManagerThemeSubject.getThemeConfig(),
    };
    this.subscriptions = [];
  }

  componentDidMount() {
    this.setHtmlClassNameByTheme();
    this.subscriptions.push(
      ManagerThemeSubject.subscribe(() => {
        this.setState({
          themeConfig: ManagerThemeSubject.getThemeConfig(),
        });
        this.setHtmlClassNameByTheme();
      }),
    );
  }

  componentWillUnmount() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  setHtmlClassNameByTheme() {
    document.querySelector('html').className = `${ManagerThemeSubject.getThemeName()}-theme`;
  }

  render() {
    const {themeConfig} = this.state;
    return (
      <ThemeContext.Provider value={themeConfig}>
        <Switch>
          {
            APP_ROUTES.map((route) => (
              <Route 
                key={route.path}
                path={route.path} 
                exact={route.exact} 
                component={route.component} 
              />
            ))
          }
        </Switch>
      </ThemeContext.Provider>
    );
  }
}
