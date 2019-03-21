import { getSearchResults, tokenizer, getGroupedQueriesForLunr } from '../../src/utils/search';

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

  describe('Tokenizer Integration with wink-nlp-utils', () => {
    // i feel like this is not the best code but it works?
    test('when a string is passed it, it gets tokenized into a list', () => {
      const query1 = 'Hello World!';
      const query2 = ' Hello World!  extra spaces ';
      const tokenized1 = tokenizer(query1);
      const tokenized2 = tokenizer(query2);

      expect(tokenized1.terms()).toEqual(['Hello', 'World', '!']);
      expect(tokenized2.terms()).toEqual(['Hello', 'World', '!', 'extra', 'spaces']);
    });

    test('when filtering by punctuation it removes it', () => {
      const query1 = 'Hello World!';
      const query2 = ' Hello World!  extra spaces ';
      const tokenized1 = tokenizer(query1);
      const tokenized2 = tokenizer(query2);

      expect(tokenized1.withoutPunctuation().terms()).toEqual(['Hello', 'World']);
      expect(tokenized2.withoutPunctuation().terms()).toEqual([
        'Hello',
        'World',
        'extra',
        'spaces',
      ]);
    });

    test('when reseting it returns original tokens', () => {
      const query1 = 'Hello World!';
      const tokenized1 = tokenizer(query1);
      const originalTokens = tokenized1.terms();
      const filteredTokens = tokenized1.withoutPunctuation().terms();
      const resetTokens = tokenized1.reset().terms();

      expect(originalTokens).not.toEqual(filteredTokens);
      expect(resetTokens).toEqual(originalTokens);
    });

    test('when removing stop words it returns a list without them', () => {
      const query1 = 'Hello this World!';
      const tokenized1 = tokenizer(query1);
      const originalTokens = tokenized1.terms();
      const withoutStopwords = tokenized1.withoutStopwords();

      expect(originalTokens).not.toEqual(withoutStopwords);
      expect(withoutStopwords).toEqual(['Hello', 'World', '!']);
    });
  });

  describe('getGroupedQueriesForLunr integration with tokenizer', () => {
    it('groups a search', () => {
      const results = getGroupedQueriesForLunr('hello this world!');
      expect(results).toEqual(['hello+ this+ world!+', 'hello', 'world']);
    });
  });
});
