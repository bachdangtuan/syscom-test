export function p(data, ...transformers) {
  try {
    let result = data;
    for (let i = 0; i < transformers.length; i += 1) {
      result = transformers[i](result);
    }
    return result;
  } catch (err) {
    console.error('Pipe Utils: ', err);
    return '';
  }
}
