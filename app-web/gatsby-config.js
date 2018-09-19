const autoprefixer = require('autoprefixer');

module.exports = {
  siteMetadata: {
    title: 'Devhub',
  },
  mapping: {},
  plugins: [
    // Adding various source folders to the GraphQL layer.
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `fonts`,
        path: `${__dirname}/src/assets/fonts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images/`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: ``,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-json',
    'gatsby-transformer-yaml',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
  ],
};
