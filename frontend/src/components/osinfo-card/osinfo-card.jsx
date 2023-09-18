import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {splitArrayIntoTwo} from 'utils/util-split-array';
import {p} from 'utils/util-pipe';
import {snake2Key} from 'utils/util-snake-transform';
import {t} from 'utils/util-translate';

import './osinfo-card.scss';

export default class OsinfoCard extends Component {
  render() {
    const {osInfo, noHeader} = this.props;
    const [leftProps, rightProps] = splitArrayIntoTwo(Object.keys(osInfo || {}));
    return (
      <div className="card margin-bottom-0 osinfo-card">
        {
          !noHeader
            ? <div className="card-divider font-bold">
              Thông tin OS
            </div>
            : null
        }
        <div className="card-section">
          <div className="grid-x grid-margin-x head">
            <div className="cell large-6 medium-12 margin-bottom-0">
              {
                leftProps.map((prop) => (
                  <div key={prop} className="flex-container information">
                    <div className="text-uppercase title">{p(prop, snake2Key, t)}:</div>
                    <div className="content">{osInfo[prop]}</div>
                  </div>
                )) 
              }
            </div>
            <div className="cell large-6 medium-12 margin-bottom-0">
              {
                rightProps.map((prop) => (
                  <div key={prop} className="flex-container information">
                    <div className="text-uppercase title">{p(prop, snake2Key, t)}:</div>
                    <div className="content">{osInfo[prop]}</div>
                  </div>
                )) 
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OsinfoCard.propTypes = {
  noHeader: PropTypes.bool,
  osInfo: PropTypes.shape({
    architecture: PropTypes.string,
    build_number: PropTypes.string,
    computer_name: PropTypes.string,
    install_date: PropTypes.string,
    max_number_of_processes: PropTypes.string,
    name: PropTypes.string,
    number_of_processes: PropTypes.string,
    number_of_users: PropTypes.string,
    os_name: PropTypes.string,
    process_memory_size: PropTypes.string,
    registered_user: PropTypes.string,
    serial_number: PropTypes.string,
    version: PropTypes.string,
  }),
};
