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
          content: excerpt(pruneLength: 1000)
        }
        internal {
          type
        }
      }
    }
  }
  DevhubSiphon: allDevhubSiphon(filter: { source: { type: { eq: "web" } } }) {
    edges {
      node {
        id
        fields {
          title
          description
          tags
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
          content
        }
      }
    }
  }
}`;

const settings = { attributesToSnippet: [`excerpt:20`] };

export const NODE_TYPE_FIELD_NAME = '_nodeType';
/**
 * Flat GitHubRawNode so when node is been indexed to Algolia, all resource will have same data structure.
 * @param {Array} nodes gatsby graphql nodes
 * @returns {Array} normalized array of node structures
 */
export const reduceNodesForIndex = nodes => {
  return nodes.map(node => {
    const {
      internal: { type },
    } = node;
    let fields,
      content,
      id = node.id;

    if (type === 'GithubRaw') {
      fields = node.childMarkdownRemark.fields;
      content = node.childMarkdownRemark.content;
    } else {
      content = '';
      fields = node.fields;
    }
    return {
      fields,
      content,
      id,
      [NODE_TYPE_FIELD_NAME]: type,
    };
  });
};

export const queries = [
  {
    query: algoliaIndexQuery,
    transformer: ({ data: { GithubSource, DevhubSiphon, EventbriteEvents } }) =>
      reduceNodesForIndex(
        flattenGatsbyGraphQL(GithubSource.edges)
          .concat(flattenGatsbyGraphQL(DevhubSiphon.edges))
          .concat(flattenGatsbyGraphQL(EventbriteEvents.edges)),
      ),
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
