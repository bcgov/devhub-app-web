import { flattenGatsbyGraphQL } from '../utils/dataHelpers';

const algoliaIndexQuery = `{
  GithubSource: allGithubRaw {
    edges {
      node {
        id
        childMarkdownRemark {
          fields {
            description
            title
            tags
          }
          internal {
            type
          }
        }
        internal {
          type
        }
      }
    }
  }
  DevhubSiphon: allDevhubSiphon {
    edges {
      node {
        id
        fields {
          title
          description
        }
        internal {
          type
        }
      }
    }
  }
  EventbriteEvents: allEventbriteEvents {
    edges {
      node {
        id
        fields {
          title
          description
        }
        internal {
          type
        }
      }
    }
  }
}`;

const settings = { attributesToSnippet: [`excerpt:20`] };

/**
 * Flat GitHubRawNode so when node is been indexed to Algolia, all resource will have same data structure.
 * @param {Array} edges the edges for allGithubRaw that all information we need is in childMarkdownRemark field
 * @returns {Array} the github nodes that has same data structure as DevhubSiphon and EventbriteEvents
 */
export const reduceGithubRawNode = edges => {
  return flattenGatsbyGraphQL(edges).map(
    ({ childMarkdownRemark: { fields }, id, internal: { type } }) => ({
      id,
      fields,
      __type: type,
    }),
  );
};

export const queries = [
  {
    query: algoliaIndexQuery,
    transformer: ({ data: { GithubSource, DevhubSiphon, EventbriteEvents } }) =>
      reduceGithubRawNode(GithubSource.edges)
        .concat(flattenGatsbyGraphQL(DevhubSiphon.edges))
        .concat(flattenGatsbyGraphQL(EventbriteEvents.edges)),
    indexName: `Devhub-Algolia`,
    settings,
  },
];

/**
 * returns all queries with the index name suffixed
 * @param {String} suffix the suffix for the index
 * @returns {Array} the queries used by gatsby-plugin-algolia
 */
export const getQueries = (suffix = '') => {
  let suffixName = '';
  if (suffix) suffixName = `-${suffix}`;
  return queries.map(q => ({ ...q, indexName: `${q.indexName}${suffixName}` }));
};
