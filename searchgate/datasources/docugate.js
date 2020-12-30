const { GraphQLDataSource } = require('apollo-datasource-graphql');
const { gql } = require('apollo-server-express');
const { BASE_DATA_SOURCES } = require('../constants');

const SEARCH_DOCUMIZE = gql`
  query Search($query: String!) {
    search(searchString: $query) { 
        id
        orgId
        itemId
        itemType
        documentId
        documentSlug
        document
        excerpt
        tags
        spaceId
        space
        spaceSlug
        template
        url
        versionId
        created
        revised
    }
  }
`;
class DocumizeApi extends GraphQLDataSource {
  constructor({ baseURL }) {
    super();
    this.baseURL = baseURL;
    this.dataSourceType = BASE_DATA_SOURCES.documize;
  }

  static documizeResultReducer(results) {
    const { id } = results;
    return {
      id,
      type: BASE_DATA_SOURCES.documize,
      typePayload: JSON.stringify(results),
    };
  }

  async search({ query }) {
    try {
      const response = await this.query(SEARCH_DOCUMIZE, {
        variables: {
          query,
        },
      });

      return response.data.search.map(DocumizeApi.documizeResultReducer);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports = DocumizeApi;
