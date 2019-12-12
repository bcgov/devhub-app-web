const algoliaIndexQuery = `{
  GithubSource: allMarkdownRemark(filter: {fileAbsolutePath: {eq: null}}) {
    edges {
      node {
        id
        fields {
          author
          description
          title
          tags
          standAlonePath
          resourceType
        }
        internal {
          type
        }
        fileAbsolutePath
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
        standAlonePath
        resourceType
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
          standAlonePath
          resourceType
        }
        internal {
          type
        }
      }
    }
  }
}`;

const flatten = arr =>
  arr.map(({ node: { fields, id, internal: { type } } }) => ({
    ...fields,
    id,
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
