import { getSearchResults, getSearchSourcesResultTotal } from '../../src/utils/search';

describe('Search Helpers', () => {
  test('when __LUNR__ does not exist it returns {}', async () => {
    expect(await getSearchResults('foo')).toEqual({});
  });

  test('returns search results', async () => {
    // shim __LUNR__
    window.__LUNR__ = {
      __loaded: Promise.resolve({
        en: {
          store: {
            '1a': {
              id: '1',
              data: 'foo',
            },
            '2a': {
              id: '2',
              data: 'baz',
            },
          },
          index: {
            search: jest.fn(() => [{ ref: '1a' }, { ref: '2a' }]),
          },
        },
      }),
    };

    const expected = {
      '1': {
        id: '1',
        data: 'foo',
      },
      '2': {
        id: '2',
        data: 'baz',
      },
    };
    // mock out lunrs global object
    const results = await getSearchResults('foo');
    expect(results).toEqual(expected);
  });

  test('getSearchSourcesTotal return the correct total', () => {

    const sources = {
      sourceA: {results: [1, 2, 3]},
      sourceB: {results: [2, 4, 5, 7]},
    };

    const sourceToggles = {
      sourceA: true,
      sourceB: false,
    };

    const expected = 3;

    expect(getSearchSourcesResultTotal(sources, sourceToggles)).toBe(expected);
  });
});
