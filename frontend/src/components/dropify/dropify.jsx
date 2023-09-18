import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import './dropify.scss';

export default class Dropify extends Component {
  constructor(props) {
    super(props);
    this.dropifyRef = React.createRef();
    this.dropify = null;
  }

  componentDidMount() {
    const {onChange, onRemoved} = this.props;
    this.dropify = $(this.dropifyRef.current).dropify();
    $(this.dropifyRef.current).on('change', function() {
      const file = this.files[0];
      onChange(file);
    });
    this.dropify.on('dropify.afterClear', function() {
      onRemoved();
    });
  }

  componentWillUnmount() {
    this.dropify.data('dropify').destroy();
  }

  render() {
    const {defaultUrl} = this.props;
    return (
      <input type="file" ref={this.dropifyRef} {...(defaultUrl ? {'data-default-file': defaultUrl} : {})} />
    )
  }
}

Dropify.propTypes = {
  defaultUrl: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onRemoved: PropTypes.func.isRequired,
};
