export function getRiskNameOfLevel(level) {
  const intLevel = parseInt(level);
  if (intLevel > 4) {
    return 'Nghiêm trọng';
  }
  if (intLevel < 0) {
    return 'Lưu ý';
  }
  return ['Lưu ý', 'Thấp', 'Trung bình', 'Cao', 'Nghiêm trọng'][intLevel] || 'Không rõ';
}
