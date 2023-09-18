import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {getRiskNameOfLevel} from 'utils/util-risk-level';

import Spinner from 'components/spinner/spinner';

export default class RisksTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: {},
    };
  }

  handleToggleExpand(risk) {
    const {expanded} = this.state;
    expanded[risk.name] = !expanded[risk.name];
    this.setState({expanded: {...expanded}});
  }

  render() {
    const {results} = this.props;
    const {expanded} = this.state;
    return(
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Điểm số</th>
            <th>Mức độ</th>
            <th>Mô tả</th>
            <th>Đề xuất khắc phục</th>
            <th>Xem các entry</th>
          </tr>
        </thead>
        <tbody>
          {
              results.done === false
              ? (
                <tr>
                  <td colSpan={6}>
                    <div className="flex-container align-center align-middle loading">
                      <Spinner />&nbsp;&nbsp;Đang tải
                    </div>
                  </td>
                </tr>
              ) : (
                (results.risks || []).map((risk) => (
                  <Fragment key={risk.name}>
                    <tr className={risk.highlight ? 'highlight' : ''}>
                      <td>{risk.name}</td>
                      <td>{risk.point}</td>
                      <td>{getRiskNameOfLevel(risk.level)}</td>
                      <td>{risk.description}</td>
                      <td>{risk.recommend}</td>
                      <td>
                        {
                          Array.isArray(risk.entries) && risk.entries.length > 0
                            ? (
                              <button 
                                className="primary tiny button margin-bottom-0" 
                                onClick={() => {this.handleToggleExpand(risk)}}
                              >
                                <i className="fi-eye icon" />
                              </button>
                            ) : 'Không có entry'
                        }
                      </td>
                    </tr>
                    {
                      expanded[risk.name]
                        ? (
                          <tr>
                            <td colSpan={6}>
                              <ul>
                                {
                                  (risk.entries || []).map((entry) => (
                                    <li key={entry.id}>
                                      {
                                        entry.malware
                                          ? (
                                            <span className="width-100 font-bold malware-alert">
                                              <div className="filename">
                                                Mã độc: {entry.path || 'Đường dẫn trống'}
                                              </div>
                                              <div className="font-normal malwares">
                                                Được phát hiện bởi engine tương tự các công cụ:&nbsp; 
                                                {
                                                  (entry.av || []).join(', ')
                                                }
                                              </div>
                                            </span>
                                          ) : (
                                            <span className="width-100">
                                              {entry.path || 'Đường dẫn trống'}
                                            </span>
                                          )
                                      }
                                    </li>
                                  ))
                                }
                              </ul>
                            </td>
                          </tr>
                        ) : null
                    }
                  </Fragment>
                ))
              )
          }
        </tbody>
      </table>
    );
  }
}

RisksTable.propTypes = {
  results: PropTypes.object.isRequired,
};
