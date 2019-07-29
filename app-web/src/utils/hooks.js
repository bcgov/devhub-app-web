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
import { Index as ElasticLunr } from 'elasticlunr';
import isEqual from 'lodash/isEqual';
import { createIam } from '../auth';
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
      const searchResults = Index.search(query, {
        fields: {
          title: { boost: 4 },
          content: { boost: 1 },
          description: { boost: 1 },
          topicName: { boost: 2 },
          labels: { boost: 2 },
          author: { boost: 2 },
        },
        expand: true,
      }).map(({ ref }) => Index.documentStore.getDoc(ref));
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
    if (this.props.useAuth) {
      implicitAuthManager.registerHooks({
        onAuthenticateSuccess: () => setUser(implicitAuthManager.getAuthDataFromLocal()),
        onAuthenticateFail: () => setUser({}),
        onAuthLocalStorageCleared: () => setUser({}),
      });

      if (window.location.origin.indexOf('localhost') < 0) {
        implicitAuthManager.handleOnPageLoad();
      }
    }
  }, []);
  return user;
};
