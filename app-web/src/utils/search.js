import isString from 'lodash/isString';
import removeMd from 'remove-markdown';
import isArray from 'lodash/isArray';
import { PERSONAS_LIST, SEARCH_RESOURCE_TYPES, RESOURCE_TYPES } from '../constants/ui';
import { GITHUB_SEARCH_SOURCE_TYPENAMES } from '../constants/search';

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
    const { name, description, url } = githubItem;
    return {
      ...githubItem,
      fields: {
        title: name,
        description,
        link: url,
        resourceType: RESOURCE_TYPES.REPOSITORIES,
        personas: PERSONAS_LIST,
      },
    };
  }

  return {};
};
/**
 * this will get documize results from docugate and
 *  modify typePayload into the 'card' interface
 * @param {Object} documizeItem
 */

export const documizeSearchPurifier = documizeItem => {
  const { document, excerpt, url } = documizeItem;
  return {
    ...documizeItem,
    fields: {
      title: document,
      description: excerpt,
      link: url,
      resourceType: SEARCH_RESOURCE_TYPES.DOCUMIZE,
    },
  };
};
