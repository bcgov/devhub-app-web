import isString from 'lodash/isString';
import removeMd from 'remove-markdown';
import isArray from 'lodash/isArray';
import { PERSONAS_LIST, SEARCH_RESOURCE_TYPES } from '../constants/ui';
import { GITHUB_SEARCH_SOURCE_TYPENAMES } from '../constants/search';

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

/**
 * if query is an empty string returns true
 * if query is an array of empty strings returns true
 * @param {Array | String} query
 * @returns {Boolean}
 */
export const isQueryEmpty = query => {
  if (isString(query)) {
    return query.trim() === '';
  } else if (isArray(query)) {
    return query.filter(q => q.trim() === '').length === 0;
  }
  return true;
};

/**
 * takes in a hash of search sources and returns the total count based on if they are toggled or not
 * @param {Object} searchSources map of search sources
 * @param {Array} searchSources.rocketchat map of search sources
 * @returns {Number} total number of search sources
 */
export const getSearchSourcesResultTotal = searchSources => {
  return Object.keys(searchSources).reduce((total, source) => {
    total += searchSources[source].length;
    return total;
  }, 0);
};

/**
 * search gate provides github results from issues and repository
 * this reduces both sets into the 'card' interface
 * @param {Object} githubItem
 */
export const githubSearchReducer = githubItem => {
  if (githubItem.__typename === GITHUB_SEARCH_SOURCE_TYPENAMES.Issue) {
    const { title, body, url } = githubItem;

    return {
      ...githubItem,
      fields: {
        title,
        description: removeMd(body),
        link: url,
        resourceType: SEARCH_RESOURCE_TYPES.GITHUB_ISSUE,
        personas: PERSONAS_LIST,
      },
    };
  } else if (githubItem.__typename === GITHUB_SEARCH_SOURCE_TYPENAMES.Repository) {
  }

  return {};
};
