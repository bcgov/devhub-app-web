/*
Copyright 2019 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/

// function takes inspiration from elastic lunr
// we may replpace lunr with elastic lunr in the future

/**
 * tokenizes a searchs string based on a reg ex seperator
 * @param {String} query the search query
 * @returns {Array} the list of tokens
 */
export const tokenizer = query => {
  return query
    .toString()
    .trim()
    .toLowerCase()
    .split(/[\s\-]+/);
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
    try {
      partialResults = lunrIndex.index.search(searchQueryPartial);
      results = lunrIndex.index.search(query);
    } catch (e) {
      console.error(e);
      // if that fails treat query as plain text and attempt search again
      partialResults = lunrIndex.index.query(function() {
        this.term(searchQueryPartial);
      });
      results = lunrIndex.index.query(function() {
        this.term(searchQueryPartial);
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
