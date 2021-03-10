require('dotenv').config({
  path: '.env.production',
});
const { topicRegistry, journeyRegistry } = require('./devhub.config.json');
const { converter } = require('./gatsby/utils/gatsbyRemark');
const { getFilesFromRegistry } = require('./gatsby/utils/githubRaw');
const { getQueries } = require('./src/utils/algolia');

// To specify a path of the registry.yaml file, set as env variable
// This comes as a pair of sourceRegistryType used by gatsby-source-github-all
// const registry_path = process.env.REGISTRY_PATH || '';

const eventbritePlugin = () =>
  process.env.EVENT_BRITE_API_KEY
    ? {
        resolve: 'gatsby-source-eventbrite',
        options: {
          organizationId: 228490647317, //csi lab org id
          accessToken: process.env.EVENT_BRITE_API_KEY,
        },
      }
    : undefined;

const algoliaPlugin = () =>
  //for CI purpose, but we do nut want to push index to algolia every time, especially on github action.
  process.env.GATSBY_ACTIVE_ENV !== 'test' || !process.env.GATSBY_ACTIVE_ENV
    ? {
        resolve: `gatsby-plugin-algolia`,
        options: {
          appId: process.env.GATSBY_ALGOLIA_APP_ID,
          apiKey: process.env.ALGOLIA_ADMIN_KEY,
          queries: getQueries(process.env.GATSBY_ALGOLIA_INDEX_NAME),
          chunkSize: 10000, // default: 1000
          enablePartialUpdates: true,
          matchFields: ['id'],
        },
      }
    : undefined;

const dynamicPlugins = [eventbritePlugin(), algoliaPlugin()];

module.exports = {
  siteMetadata: {
    title: 'DevHub',
  },
  mapping: {
    'GithubRaw.fields.topics': 'TopicRegistryJson.name',
    'DevhubSiphon.fields.topics': 'TopicRegistryJson.name',
    'GithubRaw.fields.journeys': 'JourneyRegistryJson.name',
    'GithubRaw.fields.image': 'File.url',
    'DevhubSiphon.fields.image': 'File.url',
  },
  pathPrefix: '/images',
  plugins: [
    // service worker has been causing very difficult to debug issues
    // removal of it is necessary for the time being while users have old versions of sw.js
    // cached on their browser. The date of this removal is around jan 24 2020 and we should aim
    // to REMOVE this plugin in a month or two so that we can harness the benefits of having a sw
    'gatsby-plugin-remove-serviceworker',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Devhub',
        short_name: 'Devhub',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#fff',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: 'static/images/favicon.ico', // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        include_favicon: true,
      },
    },
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
        name: 'topicRegistry',
        path: `${__dirname}/${topicRegistry.contextDir}`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'journeyRegistry',
        path: `${__dirname}/${journeyRegistry.contextDir}`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'registry',
        path: `${__dirname}/topics`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'journeyContent',
        path: `${__dirname}/journeys`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/src/assets/blog/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images/`,
      },
    },
    { resolve: 'gatsby-transformer-json', options: { failOnError: false } },
    { resolve: 'gatsby-plugin-sharp', options: { failOnError: false } },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: ['/topic/*'] }, // dynamic topic pages
    },
    {
      resolve: '@bcgov/gatsby-source-github-raw',
      options: {
        githubAccessToken: process.env.GITHUB_TOKEN,
        files: getFilesFromRegistry,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-emoji',
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: true,
              escapeEntities: { '{': '&#123;', '}': '&#125;' },
            },
          },
          {
            resolve: 'gatsby-remark-path-transform',
            options: {
              converter,
            },
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
              wrapperStyle: () => 'margin-bottom: 10px;',
              quality: 75,
            },
          },
          'gatsby-plugin-catch-links',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-github-all',
      options: {
        tokens: {
          GITHUB_API_TOKEN: process.env.GITHUB_TOKEN,
        },
        // If REGISTRY_PATH is set specifically, include this REGISTRY_TYPE as an env var
        // Format convention: camalcase of the sub path + 'Yaml'
        sourceRegistryType: 'TopicRegistryJson',
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: 'Noto Sans',
              variants: ['300', '400', '500', '400i', '700', '700i'],
            },
          ],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'typography',
      },
    },
    'gatsby-transformer-sharp',
  ].concat(dynamicPlugins.filter(plugin => plugin !== void 0)),
};
