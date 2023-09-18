import React, {Component} from 'react';
import {searchResponseAdapter} from 'antonydb-adapters';

import {searchReport} from 'apis/api-search';
import {
  extractOsArchAggregationFromAggregationData,
  extractOsNameAggregationFromAggregationData,
  extractRiskLevelAggregationFromAggregationData,
  extractRiskNameAggregationFromAggregationData,
} from 'utils/util-overview-aggregation-extract';

import Card from 'components/card/card';
import SingleSeriesPieChart from 'components/charts/single-series-pie-chart/single-series-pie-chart';
import SingleSeriesBarChart from 'components/charts/single-series-bar-chart/single-series-bar-chart';
import RiskLevelPieChart from 'components/charts/risk-level-pie-chart/risk-level-pie-chart';

import './overview.scss';

export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: 0,
      aggregationData: {},
    };
  }

  componentDidMount() {
    this.apiGetAggregationData();
  }

  async apiGetAggregationData() {
    try {
      const response = await searchReport({q: '', from: 0});
      const {aggregation, total} = searchResponseAdapter.adapt(response.data);
      this.setState({
        devices: total,
        aggregationData: aggregation,
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {devices, aggregationData} = this.state;
    return (
      <div className="grid-x grid-padding-x app-overview">
        <div className="cell large-10 large-offset-1 medium-12 small-12">
          <h3 className="text-center text-uppercase margin-bottom-2">Tổng quan</h3>
          <div className="grid-x grid-padding-x">
            <div className="cell large-4 medium-12 small-12">
              <Card header="Tổng số báo cáo">
                <div className="flex-container flex-dir-column align-center align-middle devices">
                  <h1 className="devices-number">{devices}</h1>
                  <span>Báo cáo</span>
                </div>
              </Card>
            </div>
            <div className="cell large-8 medium-12 small-12">
              <Card header="Số lượng rủi ro phát hiện theo tên">
                <SingleSeriesBarChart 
                  dataset={extractRiskNameAggregationFromAggregationData(aggregationData)} 
                />
              </Card>
            </div>
            <div className="cell large-4 medium-12 small-12">
              <Card header="Tỉ trọng các hệ điều hành">
                <SingleSeriesPieChart 
                  dataset={extractOsNameAggregationFromAggregationData(aggregationData)} 
                />
              </Card>
            </div>
            <div className="cell large-4 medium-12 small-12">
              <Card header="Tỉ trọng các kiến trúc HĐH">
                <SingleSeriesPieChart 
                  dataset={extractOsArchAggregationFromAggregationData(aggregationData)} 
                />
              </Card>
            </div>
            <div className="cell large-4 medium-12 small-12">
              <Card header="Tỉ trọng các mức độ nguy hại">
                <RiskLevelPieChart 
                  dataset={extractRiskLevelAggregationFromAggregationData(aggregationData)} 
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
