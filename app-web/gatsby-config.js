require('dotenv').config({
  path: '.env.production',
});
const { registry } = require('./devhub.config.json');
const { converter } = require('./gatsby/utils/gatsbyRemark');
const { getFilesFromRegistry } = require('./gatsby/utils/githubRaw');
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

const devopsCommonsMeetup = () =>
  process.env.MEETUP_API_KEY
    ? {
        resolve: `gatsby-source-meetup`,
        options: {
          key: process.env.MEETUP_API_KEY,
          groupUrlName: 'DevOps-Commons',
          status: 'upcoming,past',
          desc: 'true',
        },
      }
    : undefined;

const cloudNativeMeetup = () =>
  process.env.MEETUP_API_KEY
    ? {
        resolve: `gatsby-source-meetup`,
        options: {
          key: process.env.MEETUP_API_KEY,
          groupUrlName: 'Cloud-Native-Victoria',
          status: 'upcoming,past',
          desc: 'true',
        },
      }
    : undefined;

const uxGuildMeetup = () =>
  process.env.MEETUP_API_KEY
    ? {
        resolve: `gatsby-source-meetup`,
        options: {
          key: process.env.MEETUP_API_KEY,
          groupUrlName: 'bcgov-uxguild',
          status: 'upcoming,past',
          desc: 'true',
        },
      }
    : undefined;

const devopsVictoriaMeetup = () =>
  process.env.MEETUP_API_KEY
    ? {
        resolve: `gatsby-source-meetup`,
        options: {
          key: process.env.MEETUP_API_KEY,
          groupUrlName: 'meetup-group-GjYRUnKV',
          status: 'upcoming,past',
          desc: 'true',
        },
      }
    : undefined;

const SCIPSMeetup = () =>
  process.env.MEETUP_API_KEY
    ? {
        resolve: `gatsby-source-meetup`,
        options: {
          key: process.env.MEETUP_API_KEY,
          groupUrlName: 'Social-Club-for-Innovative-Public-Servants-SCIPS',
          status: 'upcoming,past',
          desc: 'true',
        },
      }
    : undefined;

const dynamicPlugins = [
  eventbritePlugin(),
  devopsCommonsMeetup(),
  cloudNativeMeetup(),
  uxGuildMeetup(),
  devopsVictoriaMeetup(),
  SCIPSMeetup(),
];

module.exports = {
  siteMetadata: {
    title: 'DevHub',
  },
  mapping: {
    'GithubRaw._xxboundProperties.topics': 'DevhubCollection.name',
    'DevhubCollection.fields.content': 'MarkdownRemark.fields.id',
    'DevhubCollection.fields.githubRaw': 'GithubRaw.id',
  },
  pathPrefix: '/images',
  plugins: [
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
    'gatsby-plugin-offline',
    'gatsby-plugin-emotion',
    `gatsby-plugin-react-helmet`,
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
        path: `${__dirname}/${registry.contextDir}`,
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
        name: 'blog',
        path: `${__dirname}/blog/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images/`,
      },
    },
    'gatsby-transformer-json',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-github-raw',
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
              linkImagesToOriginal: false,
              wrapperStyle: () => 'margin-bottom: 10px;',
              quality: 75,
            },
          },
          'gatsby-plugin-catch-links',
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
        sourceRegistryType: 'RegistryJson',
      },
    },
    {
      resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
      options: {
        // Fields to index
        fields: ['title', 'content', 'description', 'topicName', 'labels', 'author'],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          MarkdownRemark: {
            title: node => node.fields.title,
            content: node => node.fields.content.slice(0, 700),
            description: node => node.fields.description,
            labels: node => node.fields.labels,
            author: node => node.fields.author,
            id: node => node.parent,
          },
          DevhubSiphon: {
            title: node => node.unfurl.title,
            description: node => node.unfurl.description,
            topicName: node => node.topic.name,
            labels: node => node.attributes.labels,
          },
          EventbriteEvents: {
            title: node => node.name.text,
            description: node => node.description.text,
          },
          MeetupEvent: {
            title: node => node.name,
            description: node => node.description,
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
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: process.env.GATSBY_MATOMO_SITE_ID,
        matomoUrl: process.env.GATSBY_MATOMO_URL,
        siteUrl: process.env.GATSBY_MATOMO_SITE_URL,
        localScript: '/scripts/matomo.js',
        dev: true,
      },
    },
  ].concat(dynamicPlugins.filter(plugin => plugin !== void 0)),
};
