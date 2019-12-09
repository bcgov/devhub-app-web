const algoliaIndexQuery = `{
  GithubSource: allMarkdownRemark {
    edges {
      node {
        objectID: id
        fields {
          author
          description
          title
          tags
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
      objectID: id
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
      objectID: id
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

const flatten = arr =>
  arr.map(({ node: { fields, objectId, internal: { type } } }) => ({
    ...fields,
    objectId,
    __type: type,
  }));
const settings = { attributesToSnippet: [`excerpt:20`] };

export const queries = [
  {
    query: algoliaIndexQuery,
    transformer: ({ data: { GithubSource, DevhubSiphon, EventbriteEvents } }) =>
      flatten(GithubSource.edges)
        .concat(flatten(DevhubSiphon.edges))
        .concat(flatten(EventbriteEvents.edges)),
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
