import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './collapse-body.scss';

export default class CollapseBody extends Component {
  render() {
    const {expanded} = this.props;
    return (
      expanded
        ? (
          <div className="app-device-detail-collapse-body">
            {this.props.children}
          </div>
        ) : null
    );
  }
}

CollapseBody.propTypes = {
  expanded: PropTypes.bool.isRequired,
};

CollapseBody.defaultProps = {
  expanded: false,
};
