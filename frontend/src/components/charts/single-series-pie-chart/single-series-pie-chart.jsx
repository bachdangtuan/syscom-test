import React from 'react';
import PropTypes from 'prop-types';
import {ResponsivePie} from '@nivo/pie';

import SingleSeriesChart from 'abstractions/single-series-chart/single-series-chart';

export default class SingleSeriesPieChart extends SingleSeriesChart {
  makeChartDataFromDataset() {
    const {dataset} = this.props;
    return dataset.map((data) => ({
      id: data.label,
      label: data.label,
      value: data.value,
    }));
  }

  chartBaseConfig() {
    return {
      margin: {top: 30, right: 210, bottom: 30, left: 30},
      innerRadius: 0.5,
      padAngle: 0.7,
      cornerRadius: 3,
    };
  }

  chartStyleConfig() {
    const {customPalette} = this.props;
    const {themeConfig} = this.state;
    return {
      colors: customPalette || themeConfig.chartPalette,
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
        }
      },
    };
  }

  chartRadialLabelsConfig() {
    const {themeConfig} = this.state;
    return {
      enableRadialLabels: false,
      // radialLabel: (d) => {return `${d.id} (${Math.round(1000 * (d.arc.angle + d.arc.padAngle) / (2*Math.PI)) / 10}%)`},
      radialLabelsTextColor: themeConfig.chartTextColor,
      radialLabelsLinkDiagonalLength: 5,
      radialLabelsLinkHorizontalLength: 0,
      radialLabelsTextXOffset: 10,
      radialLabelsLinkColor: {from: 'color'},
    };
  }

  chartSliceLabelsConfig() {
    const {themeConfig} = this.state;
    return {
      enableSliceLabels: false,
      sliceLabelsTextColor: themeConfig.chartTextColor,
    };
  }

  chartLegendsConfig() {
    return {
      legends: [{
        anchor: 'right',
        direction: 'column',
        justify: false,
        translateX: 170 + 16,
        translateY: 0,
        itemsSpacing: 0,
        itemWidth: 170,
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
      <ResponsivePie
        {...({
          ...this.chartBaseConfig(),
          ...this.chartStyleConfig(),
          ...this.chartRadialLabelsConfig(),
          ...this.chartSliceLabelsConfig(),
          ...this.chartLegendsConfig(),
        })}
        data={this.makeChartDataFromDataset()}
      />
    );
  }
}

SingleSeriesPieChart.propTypes = {
  ...SingleSeriesChart.propTypes,
  customPalette: PropTypes.arrayOf(PropTypes.string),
};
