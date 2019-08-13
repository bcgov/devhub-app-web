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
import { useState, useEffect, useRef, useContext } from 'react';
import moment from 'moment';
import { Index as ElasticLunr } from 'elasticlunr';
import isEqual from 'lodash/isEqual';
import { createIam } from '../auth';
import { isLocalHost } from './helpers';
import { SEARCH_FIELD_NAMES, SEARCH_FIELD_MAPPING } from '../constants/search';
import isEmpty from 'lodash/isEmpty';
import AuthContext from '../AuthContext';
import { useQuery } from '@apollo/react-hooks';
import { ROCKET_GATE_QUERY } from '../constants/runtimeGraphqlQueries';

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
 * custom react hook to perform a search
 * @param {String | Array} query the query param from the url q=
 * @param {Object} staticIndex the elastic lunr index from graphql
 * notes on custom hooks https://reactjs.org/docs/hooks-custom.html
 * notes on elastic lunr implementation https://github.com/gatsby-contrib/gatsby-plugin-elasticlunr-search
 */
export const useSearch = (query, staticIndex) => {
  const [Index, setIndex] = useState(null);
  const [results, setResults] = useState(null);
  useEffect(() => {
    // load or create index
    if (Index === null) {
      setIndex(ElasticLunr.load(staticIndex));
    } else {
      let config = {
        fields: {
          title: { boost: 4, expand: true, bool: 'OR' },
          content: { boost: 1, expand: true, bool: 'OR' },
          description: { boost: 1, expand: true, bool: 'OR' },
          topicName: { boost: 2, expand: true, bool: 'OR' },
          labels: { boost: 2, expand: true, bool: 'OR' },
          personas: { boost: 2, expand: true, bool: 'OR' },
          author: { boost: 2, expand: true, bool: 'OR' },
        },
      };
      let searchQuery = query;

      if (searchQuery) {
        //splits query by ":" then filters out any empty strings etc caused by the split
        let splitQuery = searchQuery.split(':').filter(ifTrue => ifTrue);
        if (SEARCH_FIELD_NAMES.includes(splitQuery[0]) && splitQuery.length > 1) {
          //map the given string to a proper field name
          const searchField = SEARCH_FIELD_MAPPING[splitQuery[0]].text;
          //create a custom configuration for only the given field
          config = { fields: { [searchField]: { boost: 1, bool: 'OR', expand: true } } };
          //delete the first element of the array, I.E the search field
          splitQuery.shift();
          //fix any unwanted splits in the query
          searchQuery = splitQuery.join(':');
        }
      }
      let searchResults = Index.search(searchQuery, config).map(({ ref }) =>
        Index.documentStore.getDoc(ref),
      );
      if (!isEqual(results, searchResults)) {
        // Map over each ID and return the full document
        setResults(searchResults);
      }
    }
  }, [Index, staticIndex, query, results]);
  return results;
};

export const useImplicitAuth = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const implicitAuthManager = createIam();

    implicitAuthManager.registerHooks({
      onAuthenticateSuccess: () => setUser(implicitAuthManager.getAuthDataFromLocal()),
      onAuthenticateFail: () => setUser({}),
      onAuthLocalStorageCleared: () => setUser({}),
    });

    if (!isLocalHost()) {
      implicitAuthManager.handleOnPageLoad();
    }
  }, []);
  return user;
};

// returns if user is authenticated and the id token
export const useAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState({ authenticated: false, idToken: null });
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (!isEmpty(auth)) {
      const now = new Date();
      const { exp } = auth.idToken.data;
      // jwt times are in seconds, multiply by 1000 to convert into a date object
      const expDate = new Date(exp * 1000);
      // parse out auth.id_token and see if its still valid
      if (moment(now).isBefore(moment(expDate))) {
        setAuthenticated({ authenticated: true, token: auth.idToken.bearer });
      }
    }
  }, [auth]);
  return authenticated;
};

/**
 * hook that performs a rocket chat search against the rocket gate apollo api
 * @param {Boolean} authenticated
 * @param {String} queryString the search string
 * @param {Client} client the apollo client to query
 * @returns {Object} {loading, results: <Array>}
 */
export const useRCSearch = (authenticated, queryString, client) => {
  const { data, loading } = useQuery(ROCKET_GATE_QUERY, {
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
  return { results, loading: _loading };
};
