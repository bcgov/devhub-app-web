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
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Index as ElasticLunr } from 'elasticlunr';
import isEqual from 'lodash/isEqual';
import { createIam } from '../auth';
import { isLocalHost } from './helpers';
import { SEARCH_FIELD_NAMES, SEARCH_FIELD_MAPPING } from '../constants/search';
import { ROCKET_GATE_QUERY } from '../constants/runtimeGraphqlQueries';
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