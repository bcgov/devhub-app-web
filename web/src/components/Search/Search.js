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

Created by Derek Siemens
*/

import React from 'react';
import { Query } from 'react-apollo';
import { ROCKET_GATE_QUERY } from '../../constants/runtimeGraphqlQueries';
//run time query

//currently we can pass in query but remember to use gql as above since its runtime
export const SearchApollo = ({ queryString, children }) => (
  <Query query={ROCKET_GATE_QUERY} variables={queryString}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      //do stuff with data here......
      return data.search.map(message => {
        return (
          <div key={message.time}>
            <p>{message.message}</p>
          </div>
        );
      });
    }}
  </Query>
);
