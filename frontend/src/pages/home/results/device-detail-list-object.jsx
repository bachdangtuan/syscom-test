import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {PagingService} from '@tpacks/react-common-services';

import Pagination from 'components/pagination/pagination';

import './device-detail-list-object.scss';

export default class DeviceDetailListObject extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.pagingService = new PagingService(this);
    this.handlePageNumberChange = this.handlePageNumberChange.bind(this);
  }

  componentDidMount() {
    const {objects} = this.props;
    this.pagingService.setTotalItems((objects || []).length || 0);
  }

  getFromToNumbers() {
    const pageSize = this.pagingService.getPageSize();
    const pageNumber = this.pagingService.getPageNumber();
    const total = this.pagingService.getTotalItems();
    const fromResult = (pageNumber - 1) * pageSize;
    const toResult = (pageNumber - 1) * pageSize + pageSize;
    return {
      from: fromResult,
      to: toResult < total ? toResult : total,
    };
  }

  handlePageNumberChange(newPageNumber) {
    this.pagingService.setPageNumber(newPageNumber);
  }

  render() {
    const {objects, titleProp} = this.props;
    const {from, to} = this.getFromToNumbers();
    const pageNumber = this.pagingService.getPageNumber();
    const pageSize = this.pagingService.getPageSize();
    const pagingButtons = this.pagingService.makePagingButtons();
    const getRealIndexInList = (i) => ((pageNumber - 1) * pageSize + i);
    const isPagingNeeded = Array.isArray(objects) && objects.length > 10;
    return (
      <div className="app-device-detail-list-object">
        <table style={{marginBottom: isPagingNeeded ? '.5rem' : 0}}>
          <tbody>
            {
              Array.isArray(objects) && objects.length > 0
                ? objects.slice(from, to).map((object, i) => (
                  <Fragment key={getRealIndexInList(i)}>
                    <tr>
                      <td colSpan={2} className="title">
                        {1 + getRealIndexInList(i)}. {object[titleProp] || ''}
                      </td>
                    </tr>
                    {
                      Object.keys(object).map((prop) => (
                        <tr key={prop}>
                          <td>{prop}</td>
                          <td>{object[prop]}</td>
                        </tr>
                      ))
                    }
                  </Fragment>
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

DeviceDetailListObject.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.object).isRequired,
  titleProp: PropTypes.string.isRequired,
};

DeviceDetailListObject.defaultProps = {
  objects: [],
};

