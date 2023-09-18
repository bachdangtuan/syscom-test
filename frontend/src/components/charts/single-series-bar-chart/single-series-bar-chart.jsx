import React from 'react';
import {ResponsiveBar} from '@nivo/bar';

import SingleSeriesChart from 'abstractions/single-series-chart/single-series-chart';

export default class SingleSeriesBarChart extends SingleSeriesChart {
  makeChartDataFromDataset() {
    const {dataset} = this.props;
    const chartData = {id: ''};
    dataset.forEach((data) => {
      chartData[data.label] = data.value;
    });
    return [chartData];
  }

  makeChartKeysFromDataset() {
    const {dataset} = this.props;
    return dataset.map((data) => data.label);
  }

  chartBaseConfig() {
    return {
      margin: {top: 40, right: 320, bottom: 40, left: 60},
      groupMode: 'grouped',
      innerPadding: 4,
    };
  }

  chartStyleConfig() {
    const {themeConfig} = this.state;
    return {
      colors: themeConfig.chartPalette,
      theme: {
        tooltip: {
          container: {
            color: '#000000',
          }
        },
        legends: {
          text: {
            fill: themeConfig.chartTextColor,
          }
        },
        axis: {
          ticks: {
            text: {
              fill: themeConfig.chartTextColor,
            },
          },
        },
        grid: {
          line: {
            stroke: '#dddddd',
            strokeWidth: 1,
          },
        },
      },
    };
  }

  chartLabelsConfig() {
    const {themeConfig} = this.state;
    return {
      labelFormat: (d) => <tspan y={-10}>{d}</tspan>,
      labelTextColor: themeConfig.chartTextColor,
    };
  }

  chartGridAndAxisConfig() {
    return {
      enableGridY: false,
    };
  }

  chartLegendsConfig() {
    return {
      legends: [{
        anchor: 'top-right',
        direction: 'column',
        justify: false,
        translateX: 300,
        translateY: 0,
        itemsSpacing: 0,
        itemWidth: 300,
        itemHeight: 16,
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 13,
        symbolShape: 'square',
      }],
    };
  }

  render() {
    return (
      <ResponsiveBar
        {...({
          ...this.chartBaseConfig(),
          ...this.chartStyleConfig(),
          ...this.chartLabelsConfig(),
          ...this.chartGridAndAxisConfig(),
          ...this.chartLegendsConfig(),
        })}
        data={this.makeChartDataFromDataset()}
        keys={this.makeChartKeysFromDataset()}
      />
    );
  }
}

SingleSeriesBarChart.propTypes = {...SingleSeriesChart.propTypes};
