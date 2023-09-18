import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './collapse-head.scss';

export default class CollapseHead extends Component {
  render() {
    const {expanded, onToggleExpand} = this.props;
    return (
      <div 
        className="flex-container align-middle align-justify app-device-detail-collapse-head"
        onClick={onToggleExpand}
      >
        <span className="title">{this.props.children}</span>
        <span className="indicator">
          {
            expanded 
              ? <i className="fi-minus" />
              : <i className="fi-plus" />
          }
        </span>
      </div>
    );
  }
}

CollapseHead.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onToggleExpand: PropTypes.func.isRequired,
};

CollapseHead.defaultProps = {
  expanded: false,
  onToggleExpand: () => {},
};
