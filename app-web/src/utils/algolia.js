const githubSourceQuery = `{
    githubSource: allMarkdownRemark {
      edges {
        node {
          objectID: id
          fields {
            author
            description
            title
            tags
          }
        }
      }
    }
  }`;

const allDevhubSiphonQuery = `{
    DevhubSiphon: allDevhubSiphon {
    edges {
      node {
        objectID: id
        fields {
          title
          description
        }
      }
    }
  }
}`;

const allEventbriteEventsQuery = `{
    EventbriteEvents: allEventbriteEvents {
        edges {
            node {
            objectID: id
              fields {
                title
                description
              }
            }
        }
    }
}`;

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }));
const settings = { attributesToSnippet: [`excerpt:20`] };

const queries = [
  {
    query: githubSourceQuery,
    transformer: ({ data }) => flatten(data.githubSource.edges),
    indexName: `MarkdownRemark`,
    settings,
  },
  {
    query: allDevhubSiphonQuery,
    transformer: ({ data }) => flatten(data.DevhubSiphon.edges),
    indexName: `DevhubSiphon`,
    settings,
  },
  {
    query: allEventbriteEventsQuery,
    transformer: ({ data }) => flatten(data.EventbriteEvents.edges),
    indexName: `EventbriteEvents`,
    settings,
  },
];

export const getQueries = suffix =>
  queries.map(q => ({ ...q, indexName: `${q.indexName}-${suffix}` }));

module.exports = queries;
