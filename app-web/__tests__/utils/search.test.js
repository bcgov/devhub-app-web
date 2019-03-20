import { tokenizer, getSearchResults } from '../../src/utils/search';

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

  test('when a string is passed it, it gets tokenized into a list', () => {
    const query1 = 'Hello World!';
    const query2 = ' Hello World!  extra spaces ';

    expect(tokenizer(query1)).toEqual(['hello', 'world!']);
    expect(tokenizer(query2)).toEqual(['hello', 'world!', 'extra', 'spaces']);
  });
});
