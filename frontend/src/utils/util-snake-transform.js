export function snake2Title(snakeStr) {
  if (typeof snakeStr === 'string' && snakeStr.length > 0) {
    return snakeStr[0].toUpperCase() + snakeStr.slice(1).replace(/_/g, ' ');
  }
  return '';
}

export function snake2Key(snakeStr) {
  if (typeof snakeStr === 'string' && snakeStr.length > 0) {
    return snakeStr
      .split('_')
      .filter((w) => w)
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join('');
  }
  return '';
}
