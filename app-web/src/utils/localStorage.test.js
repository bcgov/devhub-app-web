import {
  saveDataInLocalStorage,
  getDataFromLocalStorage,
  deleteDataFromLocalStorage,
} from './localStorage';
// Please view https://www.npmjs.com/package/jest-localstorage-mock for usage of the local storage mock
beforeEach(() => {
  localStorage.clear();
  saveDataInLocalStorage('validKey', { a: 123 });
  saveDataInLocalStorage('anotherKey', 'a random string');
});

describe('Local Storage Helper Methods', () => {
  test('saveDataInLocalStorage stores data that is passed in', () => {
    expect(localStorage.__STORE__['validKey']).toBe(JSON.stringify({ a: 123 }));
    expect(localStorage.__STORE__['anotherKey']).toBe('a random string');
  });

  test('getDataInLocalStorage gets data when passed a valid key', () => {
    expect(getDataFromLocalStorage('validKey')).toEqual({ a: 123 });
    expect(getDataFromLocalStorage('anotherKey')).toBe('a random string');
  });

  test('getDataFromLocalStorage returns undefined when an invalid key is passed in', () => {
    expect(getDataFromLocalStorage('asdlkjf;asd')).toBe(undefined);
    expect(getDataFromLocalStorage(123123)).toBe(undefined);
    expect(getDataFromLocalStorage({ a: true })).toBe(undefined);
  });

  test('deleteDataFromLocalStorage deletes data from storage when key is passed in', () => {
    deleteDataFromLocalStorage('validKey');
    expect(getDataFromLocalStorage('validKey')).toBe(undefined);
  });
});
