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
// custom react hooks
// notes on custom hooks https://reactjs.org/docs/hooks-custom.html
import { useState, useEffect, useRef, useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import { useLazyQuery } from '@apollo/react-hooks';
import { SEARCHGATE_QUERY } from '../constants/runtimeGraphqlQueries';
import algoliasearch from 'algoliasearch/lite';
import { ALGOLIA_INDEX_SUFFIX } from '../constants/api';
import { useStaticQuery, graphql } from 'gatsby';
import { flattenGatsbyGraphQL } from './dataHelpers';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY,
);

//TODO, why in a function?
function deepCompareEquals(a, b) {
  return isEqual(a, b);
}

export function useDeepCompareMemoize(value) {
  const ref = useRef();
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
/**
 * custom react hook to perform a algolia search
 * @param {String | Array} query the query param from the url q=
 */
export const useSearch = query => {
  const [results, setResults] = useState([]);
  const index = searchClient.initIndex(`Devhub-Algolia-${ALGOLIA_INDEX_SUFFIX}`);
  useEffect(() => {
    let options = {};
    let userQuery;
    if (query) {
      if (query && query.includes('persona:')) {
        userQuery = null;
        options.facetFilters = [query];
      } else {
        userQuery = null;
        options.query = query;
        options.hitsPerPage = 200;
      }
      index.search(userQuery, options).then(res => {
        setResults(res.hits);
      });
    } else {
      setResults([]);
    }
    // eslint-disable-next-line
  }, [query]);
  return results;
};

/**
 * hook that performs a rocket chat search against the rocket gate apollo api
 * @param {Boolean} authenticated
 * @param {String} queryString the search string
 * @param {Client} client the apollo client to query
 * @returns {Object} {loading, results: <Array>}
 */
export const useSearchGate = (authenticated, queryString, client) => {
  const [execute, { data, loading, error }] = useLazyQuery(SEARCHGATE_QUERY, {
    variables: {
      queryString,
    },
    client,
  });

  const results = data ? data.search : [];

  useEffect(() => {
    if (queryString.trim() !== '' && authenticated) {
      execute();
    }
  }, [execute, queryString, authenticated]);

  return { results, loading: error ? false : loading, authenticated, error };
};

/**
 * returns a list of of siphon and github raw nodes in the format [siphonNodes, githubrawNodes]
 * this function leverages gatsby's static query hook
 */
export const useDevhubSiphonAndGithubRawNodes = () => {
  const { allDevhubSiphon, allGithubRaw } = useStaticQuery(graphql`
    query {
      allGithubRaw(filter: { fields: { pageOnly: { eq: false } } }) {
        edges {
          node {
            id
            pageViews
            html_url
            fields {
              resourceType
              title
              description
              image {
                ...cardFixedImage
              }
              pagePaths
              standAlonePath
              slug
              personas
            }
            internal {
              type
            }
            childMarkdownRemark {
              htmlAst
              html
            }
          }
        }
      }
      allDevhubSiphon(filter: { source: { type: { eq: "web" } } }) {
        edges {
          node {
            id
            internal {
              type
            }
            fields {
              resourceType
              personas
              title
              description
              image {
                ...cardFixedImage
              }
              pagePaths
              standAlonePath
            }
          }
        }
      }
    }
  `);
  const siphon = useMemo(() => flattenGatsbyGraphQL(allDevhubSiphon.edges), [
    allDevhubSiphon.edges,
  ]);
  const githubRaw = useMemo(() => flattenGatsbyGraphQL(allGithubRaw.edges), [allGithubRaw.edges]);
  return [siphon, githubRaw];
};
