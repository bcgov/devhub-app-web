require('dotenv').config({
  path: '.env.production',
});

module.exports = {
  siteMetadata: {
    title: 'Devhub',
  },
  mapping: {},
  plugins: [
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
<<<<<<< HEAD
        name: 'registry',
=======
        name: `registry`,
>>>>>>> sprint-3
        path: `${__dirname}/source-registry/`,
      },
    },
    {
<<<<<<< HEAD
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'fonts',
=======
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `fonts`,
>>>>>>> sprint-3
        path: `${__dirname}/src/assets/fonts`,
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
    'gatsby-plugin-react-next',
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
        token: process.env.GITHUB_TOKEN,
      },
    },
<<<<<<< HEAD
    'gatsby-transformer-remark',
=======
>>>>>>> sprint-3
  ],
};
