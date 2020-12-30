require('dotenv').config({
  path: '.env.production',
});

const { ApolloServer, gql } = require('apollo-server');
const flatten = require('lodash/flatten');
const userConfig = require('./config/index.json');
const baseConfig = require('./constants');
const RocketGateAPI = require('./datasources/rocket.gate');
const GitHubAPI = require('./datasources/github');
const DocugateAPI = require('./datasources/docugate');

const DATA_SOURCES = {
  rocketchat: new RocketGateAPI({
    baseURL: process.env.ROCKETGATE_BASE_URL,
  }),
  github: new GitHubAPI({ authToken: process.env.GITHUB_AUTH_TOKEN }),
  documize: new DocugateAPI({
    baseURL: process.env.DOCUGATE_BASE_URL,
  }),
};

const DATA_SOURCE_NAMES = Object.keys(DATA_SOURCES);
// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
// @todo should expose a room query, and leverage that *within* the search query
const typeDefs = gql`      
  type SearchResult {
    id: String
    type: String
    typePayload: String      
  } 

  # The "Query" type is the root of all GraphQL queries.
  type Query {    
    search( searchString: String!, dataSources: [String]): [SearchResult]
    dataSources: [String]
  }
  
`;

const resolveMultipleSearches = (dataSources, searchString, dataSourcesToSearch = ['rocketchat', 'documize', 'github']) => {
  const config = { ...baseConfig, ...userConfig };

  return DATA_SOURCE_NAMES.filter((source) => dataSourcesToSearch.includes(source)).map((source) => {
    const instance = dataSources[source];
    const { dataSourceType } = instance;
    const configForType = config[dataSourceType] || {};
    return instance.search({ query: searchString, ...configForType });
  });
};
// Resolvers define the technique for fetching the types in the
// schema.
const resolvers = {
  Query: {
    search: (_, { searchString, dataSources: dataSourcesToSearch }, { dataSources }) => Promise.all(resolveMultipleSearches(dataSources, searchString, dataSourcesToSearch)).then((res) => flatten(res)),
    dataSources: () => Promise.resolve(DATA_SOURCE_NAMES),
  },


};

// Start ApolloServer by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => DATA_SOURCES,
});

// This `listen` method launches a web-server.
server.listen({
  port: 4001,
}).then(({ url }) => {
  console.log(`🚀  Search.Gate GraphQL search gateway ready at ${url}`);
});
