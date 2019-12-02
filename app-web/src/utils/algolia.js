const githubSourceQuery = `{
    githubSource: allMarkdownRemark {
      edges {
        node {
          objectID: id
          fields {
            author
            description
            slug
            title
            tags
            topicName
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
          personas
          title
          description
          labels
          topics {
            name
          }
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
                topics
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

module.exports = queries;
