const STORAGE_PREFIX = 'SYSCOM.';

function jsonStringify(object) {
  return JSON.stringify(object);
}

function jsonParse(jsonString) {
  return JSON.parse(jsonString);
}

export function getFromLocalStorage(key) {
  try {
    const jsonString = window.localStorage.getItem(STORAGE_PREFIX + key);
    return jsonParse(jsonString);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function saveToLocalStorage(key, object) {
  try {
    const jsonString = jsonStringify(object);
    window.localStorage.setItem(STORAGE_PREFIX + key, jsonString);
  } catch (err) {
    console.error(err);
  }
}
