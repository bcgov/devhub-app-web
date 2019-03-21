// function takes inspiration from elastic lunr
// we may replpace lunr with elastic lunr in the future

import nlp from 'wink-nlp-utils';
import uniq from 'lodash/uniq';
/**
 * tokenizes a searchs string and removes punctuation
 * @param {String} query the search query
 * @returns {Object} utils helper functions
 */
export const tokenizer = function(query) {
  // remove stop words from query
  const tokens = nlp.string.tokenize(query, true);

  return {
    tokens: [...tokens],
    /**
     * returns the list of tokens as a array of strings ['foo', 'bar']
     */
    terms: function() {
      return uniq(this.tokens.map(t => t.value));
    },
    /**
     * sets the list of tokens minus punctuation
     * @returns {Object} this (for chaining methods)
     * usage is tokenizer('foo').withoutPunctuation().terms()
     */
    withoutPunctuation: function() {
      this.tokens = this.tokens.filter(t => t.tag !== 'punctuation');
      return this;
    },
    /**
     * resets terms to original
     * @returns {Object} this for method chaining
     */
    reset: function() {
      this.tokens = [...tokens];
      return this;
    },
    /**
     * removes stop words and returns the remaining terms list
     * @returns {Array} ['Hello', 'this', 'world'] => ['Hello', 'world]
     * https://en.wikipedia.org/wiki/Stop_words
     * ** recommend chaining on filtering puncuation before using this function
     * tokenizer('hello this world!').withoutPunctuation().withoutStopWords()
     */
    withoutStopwords: function() {
      return nlp.tokens.removeWords(this.terms());
    },
  };
};

/**
 * takes search string and seperates into grouped query tokens
 * lunr does not allow logical groupings of search terms. To replicate
 * a search of (term1 && term2 && term3) || term1 || term2 || term3
 * this function tokenizes the search string, removes stop words and produces
 * logical groupings using lunr term presence predicates
 * @param {String} originalQuery the search string
 * @param {Array} searchQueries the list of search queries to be used by the search index
 */
export const getGroupedQueriesForLunr = originalQuery => {
  const tokenized = tokenizer(originalQuery);
  // gets the terms tokenized without stopp words and other useless search terms
  // 'hello this world!' => ['hello', 'world']
  const tokenizedTerms = tokenized.withoutPunctuation().withoutStopwords();
  // original query gets mapped with term presence predicate for lunr searches
  // this convers the query to ensure all terms are present in search
  // 'hello world' => 'hello+ world+'
  const originalQueryWithTermPresence = originalQuery
    .split(' ')
    .map(term => term.trim())
    .join('+ ');

  // return query groupings
  // adding term presence '+' to end since it would have been missing in join
  return [`${originalQueryWithTermPresence}+`].concat(tokenizedTerms);
};
/**
 * gets search results from lunr
 * @param {String} query the search string
 */
export const getSearchResults = async query => {
  if (window && window.__LUNR__) {
    const lunr = await window.__LUNR__.__loaded;
    const lunrIndex = lunr.en;
    let results = [];
    // search results by a partial query using wild cards
    let partialResults = [];
    let searchQueryPartial = `*${query}*`;

    // attempt to search by parsing query into fields
    // by whole query without wild card
    try {
      results = lunrIndex.index.search(query);
    } catch (e) {
      results = lunrIndex.index.query(q => {
        q.term(query);
      });
    }

    // by query with wild card
    try {
      partialResults = lunrIndex.index.search(searchQueryPartial);
    } catch (e) {
      // if that fails treat query as plain text and attempt search again
      partialResults = lunrIndex.index.query(q => {
        q.term(searchQueryPartial);
      });
    }

    // combine all partial search results with full search results
    results = results.concat(partialResults);
    // search results is an array of reference keys
    // we need to map those to the index store to get the actual
    // node ids
    const searchResultsMap = results
      .map(({ ref }) => lunrIndex.store[ref])
      .reduce((obj, result) => {
        obj[result.id] = { ...result };
        return obj;
      }, {});

    return searchResultsMap;
  }
  return {};
};
