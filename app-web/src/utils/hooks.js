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
import { useState, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import { createIam } from '../auth';
import { isLocalHost } from './helpers';
import { useQuery } from '@apollo/react-hooks';
import { SEARCHGATE_QUERY } from '../constants/runtimeGraphqlQueries';
import algoliasearch from 'algoliasearch/lite';
import { ALGOLIA_INDEX_SUFFIX } from '../constants/api';

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
  const [results, setResults] = useState(null);
  const index = searchClient.initIndex(`Devhub-Algolia-${ALGOLIA_INDEX_SUFFIX}`);
  useEffect(() => {
    if (query) {
      // if no query, I.E query is '', algolia will return all index....
      index
        .search({
          query: query,
          hitsPerPage: 200, //set it to a large number, the default value is 200, which some search result is over that number
        })
        .then(res => {
          setResults(res.hits);
        });
    } else {
      setResults(null);
    }
  }, [index, query]);
  return results;
};

export const useImplicitAuth = intention => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const implicitAuthManager = createIam();
    implicitAuthManager.registerHooks({
      onAuthenticateSuccess: () => setUser(implicitAuthManager.getAuthDataFromLocal()),
      onAuthenticateFail: () => setUser({}),
      onAuthLocalStorageCleared: () => {
        setUser({});
      },
    });

    if (!isLocalHost()) {
      implicitAuthManager.handleOnPageLoad();
    }

    if (intention === 'LOGOUT') {
      implicitAuthManager.clearAuthLocalStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return user;
};

/**
 * hook that performs a rocket chat search against the rocket gate apollo api
 * @param {Boolean} authenticated
 * @param {String} queryString the search string
 * @param {Client} client the apollo client to query
 * @returns {Object} {loading, results: <Array>}
 */
export const useSearchGate = (authenticated, queryString, client) => {
  const { data, loading } = useQuery(SEARCHGATE_QUERY, {
    variables: {
      queryString,
    },
    client,
  });
  const [results, setResults] = useState([]);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(loading);

    if (!authenticated || !queryString) {
      setResults([]);
    } else if (!_loading) {
      setResults(data.search);
    }

    return () => {
      setResults([]);
    };
    //Reminder - Ask patrick about this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, useDeepCompareMemoize([_loading, loading, authenticated, queryString, results]));

  return { results, loading: _loading, authenticated };
};
