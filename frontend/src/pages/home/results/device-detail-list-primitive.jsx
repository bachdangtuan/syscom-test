import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'components/pagination/pagination';
import DeviceDetailListObject from './device-detail-list-object';

import './device-detail-list-object.scss';

export default class DeviceDetailListPrimitive extends DeviceDetailListObject {
  render() {
    const {objects: values} = this.props;
    const {from, to} = this.getFromToNumbers();
    const pageNumber = this.pagingService.getPageNumber();
    const pageSize = this.pagingService.getPageSize();
    const pagingButtons = this.pagingService.makePagingButtons();
    const getRealIndexInList = (i) => ((pageNumber - 1) * pageSize + i);
    const isPagingNeeded = Array.isArray(values) && values.length > 10;
    return (
      <div className="app-device-detail-list-object">
        <table style={{marginBottom: isPagingNeeded ? '.5rem' : 0}}>
          <tbody>
            {
              Array.isArray(values) && values.length > 0
                ? values.slice(from, to).map((value, i) => (
                  <tr key={getRealIndexInList(i)}>
                    <td>
                      {1 + getRealIndexInList(i)}
                    </td>
                    <td>
                      {value || ''}
                    </td>
                  </tr>
                ))
                : <tr><td>Không có dữ liệu</td></tr>
            }
          </tbody>
        </table>
        {
          isPagingNeeded
            ? (
              <div className="pagination-container">
                <Pagination
                  pagingButtons={pagingButtons}
                  pageNumber={pageNumber}
                  onPageNumberChange={this.handlePageNumberChange}
                />
              </div>
            ) : null
        }
      </div>
    );
  }
}

DeviceDetailListPrimitive.propTypes = {
  objects: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
};

DeviceDetailListPrimitive.defaultProps = {
  objects: [],
};

