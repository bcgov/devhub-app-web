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
        internal{
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

export const reduceGithubRawNode = node => {
  return flattenGatsbyGraphQL(node).map(
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
 * returns all queries with the indexname suffixed
 * @param {String} suffix the suffix for the index
 * @returns {Array} the queries used by gatsby-plugin-algolia
 */
export const getQueries = (suffix = '') => {
  let suffixName = '';
  if (suffix) suffixName = `-${suffix}`;
  return queries.map(q => ({ ...q, indexName: `${q.indexName}${suffixName}` }));
};
