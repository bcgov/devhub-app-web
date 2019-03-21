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
