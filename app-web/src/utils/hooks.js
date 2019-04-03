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
import { useState } from 'react';
import { Index as ElasticLunr } from 'elasticlunr';

/**
 * custom react hook to perform a search
 * @param {String | Array} query the query param from the url q=
 * @param {Object} staticIndex the elastic lunr index from graphql
 * notes on custom hooks https://reactjs.org/docs/hooks-custom.html
 * notes on elastic lunr implementation https://github.com/gatsby-contrib/gatsby-plugin-elasticlunr-search
 */
export const useSearch = (query, staticIndex) => {
  // load or create index
  const [Index, setIndex] = useState(null);
  const [results, setResults] = useState(null);
  if (Index === null) {
    setIndex(ElasticLunr.load(staticIndex));
  } else {
    if (results === null) {
      // Map over each ID and return the full document
      const searchResults = Index.search(query, { expand: true }).map(({ ref }) =>
        Index.documentStore.getDoc(ref),
      );
      setResults(searchResults);
    }
  }

  return results;
};
