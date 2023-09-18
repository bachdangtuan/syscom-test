import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {AuthenSubject} from 'services/authentication/authentication';

export default class Guard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRender: null,
      redirectTo: '/login',
    };
    this.subscriptions = [];
  }

  componentDidMount() {
    this.subscriptions.push(
      AuthenSubject.subscribe(() => {this.doGuard()}),
    );
    this.doGuard();
  }

  componentWillUnmount() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  async doGuard() {
    this.setState({shouldRender: true});
  }

  render() {
    const {component, props} = this.props;
    const {shouldRender, redirectTo} = this.state;
    if (shouldRender === true) {
      return React.createElement(component, props);
    } else if (shouldRender === false) {
      return <Redirect to={redirectTo} />
    }
    return null;
  }
}

Guard.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.instanceOf(Component), 
    PropTypes.func,
  ]).isRequired,
  props: PropTypes.object,
};

