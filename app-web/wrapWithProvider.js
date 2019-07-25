/*
Copyright 2018 Province of British Columbia

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

import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { AuthProvider } from './src/AuthContext';
import theme from './theme';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
//this needs to be an enviroment variable later on......
const client = new ApolloClient({
  link: createHttpLink({ uri: 'https://rocketgate-dev-devhub-dev.pathfinder.gov.bc.ca' }),
  cache,
});

export default ({ element }) => (
<<<<<<< HEAD
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <AuthProvider>{element}</AuthProvider>
    </ApolloProvider>
  </ThemeProvider>
=======
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>{element}</ThemeProvider>
  </ApolloProvider>
>>>>>>> Getting the client link working and testing query
);
