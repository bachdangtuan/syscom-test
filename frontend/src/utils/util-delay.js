export function delay(timeInMs = 1000) {
  return new Promise((resolve) => {setTimeout(resolve, timeInMs)});
}
