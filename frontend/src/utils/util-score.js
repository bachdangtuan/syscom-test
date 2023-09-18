export function getScoreColor(score) {
  const colors = [
    '#c51f5d',
    '#cd3447',
    '#ce4b31',
    '#c9621b',
    '#bd7800',
    '#ad8c00',
    '#989e08',
    '#7eae2e',
    '#5abd52',
    '#00ca79',  
  ];
  let level = Math.floor(score / 10);
  if (level < 0) {
    level = 0;
  }
  if (level > 9) {
    level = 9;
  }
  return colors[level];
}

export function calculateScore(report) {
  if (Array.isArray(report.risks) && report.risks.length > 0) {
    const harm = report.risks.reduce((c, n) => (c + n.point || 0), 0);
    const score = 100 - harm;
    return score > 0 ? score : 0;
  }
  return 100;
}
