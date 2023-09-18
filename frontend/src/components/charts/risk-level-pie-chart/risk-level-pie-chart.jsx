import React from 'react';

import SingleSeriesChart from 'abstractions/single-series-chart/single-series-chart';
import SingleSeriesPieChart from 'components/charts/single-series-pie-chart/single-series-pie-chart';

export default class RiskLevelPieChart extends SingleSeriesChart {
  render() {
    const {themeConfig} = this.state;
    return (
      <SingleSeriesPieChart
        {...this.props}
        customPalette={themeConfig.riskLevelChartPalette}
      />
    );
  }
}

SingleSeriesPieChart.propTypes = {...SingleSeriesChart.propTypes};
