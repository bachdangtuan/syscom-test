export function extractOneHighlightInfo(highlight) {
  if (highlight) {
    return getFirstHighlightFieldAndValue(highlight);
  }
  return {field: '', value: ''};
}

function getFirstHighlightFieldAndValue(highlight) {
  const firstHighlightField = Object.keys(highlight)[0];
  if (firstHighlightField) {
    const firstHighlightValue = getHighlightValue(highlight, firstHighlightField);
    return {field: firstHighlightField, value: firstHighlightValue};
  }
  return {field: '', value: ''};
}

function getHighlightValue(highlight, highlightField) {
  if (highlight && highlightField) {
    const highlightValues = highlight[highlightField];
    if (Array.isArray(highlightValues)) {
      return highlightValues[0];
    }
    return highlightValues;
  }
  return '';
}
