const { GraphQLDataSource } = require('apollo-datasource-graphql');
const { gql } = require('apollo-server-express');
const { BASE_DATA_SOURCES } = require('../constants');

const SEARCH_ROCKETGATE = gql`
  query Search($query: String!) {
    search(searchString: $query) {
            id
            message
            url
            author
            time
            roomId
            room {
              id
              name
            }   
    }
  }
  
`;

class RocketGateApi extends GraphQLDataSource {
  constructor({ baseURL }) {
    super();
    this.baseURL = baseURL;
    this.dataSourceType = BASE_DATA_SOURCES.rocketchat;
  }

  /**
     * assembles a github v4 api search query that specifically searches within an organization
     * @param {String} query
     * @param {String} org
     */
  static queryWithOrg(query, org) {
    return `${query} org:${org}`;
  }

  static rocketChatResultReducer(chatEdge) {
    const { id } = chatEdge;
    return {
      id,
      type: BASE_DATA_SOURCES.rocketchat,
      typePayload: JSON.stringify(chatEdge),
    };
  }

  async search({ query }) {
    try {
      const response = await this.query(SEARCH_ROCKETGATE, {
        variables: {
          query,
        },
      });

      return response.data.search.map(RocketGateApi.rocketChatResultReducer);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports = RocketGateApi;
