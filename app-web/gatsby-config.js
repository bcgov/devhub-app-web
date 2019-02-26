require('dotenv').config({
  path: '.env.production',
});
const { converter } = require('./src/utils/gatsby-remark-transform-path');
// To specify a path of the registry.yaml file, set as env variable
// This comes as a pair of sourceRegistryType used by gatsby-source-github-all
const registry_path = process.env.REGISTRY_PATH || '';

module.exports = {
  siteMetadata: {
    title: 'DevHub',
  },
  pathPrefix: '/images',
  mapping: {},
  plugins: [
    'gatsby-plugin-emotion',
    // Adding various source folders to the GraphQL layer.
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'registry',
        path: `${__dirname}/source-registry/${registry_path}`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images/`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: '',
      },
    },
    // 'gatsby-transformer-json',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-github-api',
      options: {
        // token required by the Github API
        token: process.env.GITHUB_TOKEN, // required
        variables: {},
        graphQLQuery: `
        query {
          organization(login:"BCDevOps") {
            repository(name: "pathfinder") {
              name,
              resources: object(expression: "master:resources.yml") {
                ...on Blob {
                  text
                }
              }
            }
          }
        }`,
      },
    },
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-github-all',
      options: {
        tokens: {
          GITHUB_API_TOKEN: process.env.GITHUB_TOKEN,
        },
        // If REGISTRY_PATH is set specifically, include this REGISTRY_TYPE as an env var
        // Format convention: camalcase of the sub path + 'Yaml'
        sourceRegistryType: process.env.REGISTRY_TYPE || 'SourceRegistryYaml',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: true,
            },
          },
          {
            resolve: 'gatsby-remark-path-transform',
            options: {
              converter,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          'gatsby-plugin-catch-links',
        ],
      },
    },
    // this plugin creates a front end search index found at window.__LUNR__
    // please see npm docs for its usage, it is still up in the air how to implement
    // the search against the rest of the gatsby app. As of now, data is coming from two sources
    // the gatsby graphql source on build time, and the LUNR index on run time.
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
        languages: [
          {
            name: 'en',
          },
        ],
        // Fields to index. If store === true value will be stored in index file.
        // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
        fields: [
          { name: 'description', attributes: { boost: 20 } },
          { name: 'content' },
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'author' },
          { name: 'collectionName' },
          { name: 'url' },
          { name: 'source' },
          { name: 'id', store: true },
          { name: 'resourceType', store: true },
        ],
        // How to resolve each field's value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields' values
          DevhubSiphon: {
            title: node => node.unfurl.title,
            content: node => node.childMarkdownRemark && node.childMarkdownRemark.rawMarkdownBody,
            url: node => node.resource.path,
            author: node => node.unfurl.author,
            description: node => node.unfurl.description,
            source: node => node.source.displayName,
            id: node => node.id,
            collectionName: node => node.collection.name,
            resourceType: node => node.resource.type,
            personas: node => node.attributes.personas.join(' '),
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: 'Noto Sans', // default/included variants are 400,400i,700,700i
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'typography',
      },
    },
  ],
};
