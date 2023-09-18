import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './modal.scss';

export default class Modal extends Component {
  render() {
    return (
      <div className="app-modal" style={{display: this.props.isOpen ? 'flex' : 'none'}}>
        <div className="modal-dialog">
          <div className="margin-bottom-1 title">
            <h3 className="text-center margin-0 text">{this.props.title}</h3>
            <button className="margin-left-1 close" onClick={this.props.toggle}>
              &times;
            </button>
          </div>
          <div className="body">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
