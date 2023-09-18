import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './card.scss';

export default class Card extends Component {
  render() {
    return (
      <div className="card app-card">
        <div className="card-divider">
          {this.props.header}
        </div>
        <div className="card-section">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  header: PropTypes.string,
};

Card.defaultProps = {
  header: '',
};
