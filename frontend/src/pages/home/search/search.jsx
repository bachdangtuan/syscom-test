import React, {Component} from 'react';
import {FormService, PagingService} from '@tpacks/react-common-services';
import {searchResponseAdapter} from 'antonydb-adapters';

import {searchReport} from 'apis/api-search';
import {
  extractOsArchAggregationFromAggregationData,
  extractOsNameAggregationFromAggregationData,
  extractRiskLevelAggregationFromAggregationData,
} from 'utils/util-overview-aggregation-extract';
// import {getScoreColor} from 'utils/util-score';

import Card from 'components/card/card';
import Pagination from 'components/pagination/pagination';
import SingleSeriesPieChart from 'components/charts/single-series-pie-chart/single-series-pie-chart';
import RiskLevelPieChart from 'components/charts/risk-level-pie-chart/risk-level-pie-chart';
import ResultItem from './result-item';

import './search.scss';
import {deleteReport} from 'apis/api-delete-report';
import {delay} from 'utils/util-delay';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      aggregationData: {},
    };
    this.filterService = new FormService(this, {search: ''});
    this.pagingService = new PagingService(this);
    this.handlePageNumberChange = this.handlePageNumberChange.bind(this);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.handleDeleteReport = this.handleDeleteReport.bind(this);
  }

  componentDidMount() {
    this.pagingService.setTotalItems(0);
    this.apiSearchReport();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (this.pagingService.isPageNumberChanged(prevState, this.state)) {
      this.apiSearchReport();
    }
  }

  getFilterValue(field) {
    return this.filterService.getValueOfField(field);
  }

  getFromToAndTotalNumbers() {
    const pageSize = this.pagingService.getPageSize();
    const pageNumber = this.pagingService.getPageNumber();
    const total = this.pagingService.getTotalItems();
    const fromResult = pageSize * (pageNumber - 1) + 1;
    const toResult = pageSize * (pageNumber - 1) + pageSize;
    return {
      fromResult: fromResult,
      toResult: toResult < total ? toResult : total,
      totalResults: total,
    };
  }

  async apiSearchReport() {
    try {
      const search = this.filterService.getValueOfField('search');
      const pageSize = this.pagingService.getPageSize();
      const pageNumber = this.pagingService.getPageNumber();
      const response = await searchReport({q: search, from: pageSize * (pageNumber - 1)});
      const {total, results, aggregation} = searchResponseAdapter.adapt(response.data);
      this.pagingService.setTotalItems(total);
      this.setState({
        results: results || [], 
        aggregationData: aggregation || {},
      });
    } catch (err) {
      console.error(err);
    }
  }

  handleFilterChange(field, value) {
    this.filterService.setValueForField(field, value);
  }

  handlePageNumberChange(newPageNumber) {
    this.pagingService.setPageNumber(newPageNumber);
  }

  handleSearchFormSubmit(e) {
    e.preventDefault();
    this.apiSearchReport();
  }

  async handleDeleteReport(reportId) {
    try {
      await deleteReport(reportId);
      await delay();
      this.apiSearchReport();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  render() {
    const {results, aggregationData} = this.state;
    const {fromResult, toResult, totalResults} = this.getFromToAndTotalNumbers();
    const pageNumber = this.pagingService.getPageNumber();
    const pagingButtons = this.pagingService.makePagingButtons();
    return (
      <div className="grid-x grid-padding-x app-search">
        <div className="cell large-10 large-offset-1 medium-12 small-12">
          <h3 className="text-center text-uppercase margin-bottom-2">Tìm kiếm</h3>
          <div className="margin-bottom-2">
            <form onSubmit={this.handleSearchFormSubmit}>
              <input
                type="text"
                placeholder="Tìm kiếm với tên máy, hệ điều hành, người dùng, v.v..."
                value={this.getFilterValue('search')}
                onChange={(e) => {this.handleFilterChange('search', e.target.value)}}
              />
              <button type="submit" style={{display: 'none'}} />
            </form>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="cell large-4 medium-12 small-12 chart">
              <Card header="Tỉ trọng các hệ điều hành">
                <SingleSeriesPieChart 
                  dataset={extractOsNameAggregationFromAggregationData(aggregationData)} 
                />
              </Card>
            </div>
            <div className="cell large-4 medium-12 small-12 chart">
              <Card header="Tỉ trọng các kiến trúc HĐH">
                <SingleSeriesPieChart 
                  dataset={extractOsArchAggregationFromAggregationData(aggregationData)} 
                />
              </Card>
            </div>
            <div className="cell large-4 medium-12 small-12 chart">
              <Card header="Tỉ trọng các mức độ nguy hại">
                <RiskLevelPieChart 
                  dataset={extractRiskLevelAggregationFromAggregationData(aggregationData)} 
                />
              </Card>
            </div>
          </div>
          {
            totalResults
              ? (
                <div className="margin-bottom-1 total">
                  <span>Hiển thị từ</span>&nbsp;&nbsp;
                  <span className="font-bold highlight">{fromResult}</span>&nbsp;&nbsp;
                  <span>đến</span>&nbsp;&nbsp;
                  <span className="font-bold highlight">{toResult}</span>&nbsp;&nbsp;
                  <span>trong tổng số</span>&nbsp;&nbsp;
                  <span className="font-bold highlight">{totalResults}</span>&nbsp;&nbsp;
                  <span>kết quả.</span>
                </div>
              ) : null
          }
          <div className="margin-bottom-2 results">
            {results.map((r) => <ResultItem key={r._id} result={r} onDelete={this.handleDeleteReport} />)}
          </div>
          <div className="margin-bottom-2 pagination-container">
            <Pagination 
              pagingButtons={pagingButtons}
              pageNumber={pageNumber} 
              onPageNumberChange={this.handlePageNumberChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

