export function splitArrayIntoTwo(array = []) {
  const pivot = Math.ceil(array.length / 2);
  return [array.slice(0, pivot), array.slice(pivot)];
}
