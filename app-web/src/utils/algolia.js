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
          frontmatter {
            personas
          }
          content: excerpt(pruneLength: 1000)
        }
        internal {
          type
        }
      }
    }
  }
  Journeys: allJourneyRegistryJson {
    edges {
      node {
        id
        name
        fields {
          title
          resourceType
          slug
          description
        }
        internal {
          type
        }
      }
    }
  }
  Topics: allTopicRegistryJson {
    edges {
      node {
        id
        name
        fields {
          title
          resourceType
          slug
          description
        }
        description
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
          personas
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
      persona,
      id = node.id;

    if (type === 'GithubRaw') {
      fields = node.childMarkdownRemark.fields;
      content = node.childMarkdownRemark.content;
      persona = node.childMarkdownRemark.frontmatter.personas;
    } else {
      content = '';
      fields = node.fields;
      persona = node.fields.personas;
    }
    return {
      fields,
      content,
      id,
      persona,
      [NODE_TYPE_FIELD_NAME]: type,
    };
  });
};

export const queries = [
  {
    query: algoliaIndexQuery,
    transformer: ({ data: { GithubSource, DevhubSiphon, EventbriteEvents, Journeys, Topics } }) =>
      reduceNodesForIndex(
        flattenGatsbyGraphQL(GithubSource.edges)
          .concat(flattenGatsbyGraphQL(DevhubSiphon.edges))
          .concat(flattenGatsbyGraphQL(EventbriteEvents.edges))
          .concat(flattenGatsbyGraphQL(Journeys.edges))
          .concat(flattenGatsbyGraphQL(Topics.edges)),
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
