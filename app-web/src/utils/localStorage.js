/**
 * Save data in local storage
 *
 * @param {string} key
 * @param {object} data
 * @returns undefined
 */
export const saveDataInLocalStorage = (key, data) => {
  try {
    const serializedData =
      typeof data === 'object' ? JSON.stringify(data) : data;
    localStorage.setItem(key, serializedData);
  } catch (err) {
    throw new Error('Unable to save data, are you sure it is a js object?');
  }
};

/**
 * Get data that was saved in local storage
 *
 * @param {string} key
 * @returns {object} the data object
 */
export const getDataFromLocalStorage = key => {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (err) {
      return data;
    }
  }
  return undefined;
};

export const deleteDataFromLocalStorage = key => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    return undefined;
  }
};
