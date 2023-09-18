import {getRiskNameOfLevel} from 'utils/util-risk-level';

export function extractOsArchAggregationFromAggregationData(aggregationData) {
  return runExtractPreventingError((aggregationData) => {
    return aggregationData.os_arch.buckets.map((bucket) => ({
      label: bucket.key,
      value: bucket.doc_count,
    }));
  }, aggregationData);
}

export function extractOsNameAggregationFromAggregationData(aggregationData) {
  return runExtractPreventingError((aggregationData) => {
    return aggregationData.os_name.buckets.map((bucket) => ({
      label: bucket.key,
      value: bucket.doc_count,
    }));
  }, aggregationData);
}

export function extractRiskLevelAggregationFromAggregationData(aggregationData) {
  return runExtractPreventingError((aggregationData) => {
    const riskLevelCount = {};
    aggregationData.risks_level.buckets.forEach((bucket) => {
      riskLevelCount[bucket.key] = (riskLevelCount[bucket.key] || 0) + bucket.doc_count;
    });
    return [0, 1, 2, 3, 4]
      .map((level) => ({
        label: getRiskNameOfLevel(level),
        value: riskLevelCount[level] || 0, 
      }));
  }, aggregationData);
}

export function extractRiskNameAggregationFromAggregationData(aggregationData) {
  return runExtractPreventingError((aggregationData) => {
    return aggregationData.risks_name.buckets.map((bucket) => ({
      label: bucket.key,
      value: bucket.doc_count,
    }));
  }, aggregationData);
}

function runExtractPreventingError(extractor, aggregationData) {
  try {
    return extractor(aggregationData);
  } catch (err) {
    return [];
  }
}
