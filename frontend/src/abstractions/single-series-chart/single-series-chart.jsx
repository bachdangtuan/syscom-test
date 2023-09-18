import {Component} from 'react';
import PropTypes from 'prop-types';

import {ManagerThemeSubject} from 'services/managers/manager-theme';

export default class SingleSeriesChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeConfig: ManagerThemeSubject.getThemeConfig(),
    };
    this.subscriptions = [];
  }

  componentDidMount() {
    this.subscriptions.push(
      ManagerThemeSubject.subscribe(() => {
        this.setState({themeConfig: ManagerThemeSubject.getThemeConfig()});
      }),
    );
  }

  componentWillUnmount() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  render() {
    return null;
  }
}

SingleSeriesChart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
};
