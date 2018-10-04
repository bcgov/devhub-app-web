const path = require('path');
const autoprefixer = require('autoprefixer');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.modifyWebpackConfig = ({ config, env }) => {
  // switch allows to change config based on environment
  switch (env) {
    case 'develop':
      config.preLoader('eslint-loader', {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      });
      config.merge({
        postcss: [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      });
      break;
  }
  return config;
};

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  // programattically create pages from github resources
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'GithubData') {
    createNodeField({
      node,
      name: `slug`,
      value: node.data.organization.repository.name,
    });
    createNodeField({
      node,
      name: `basePagePath`,
      value: 'learn/',
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allGithubData {
          edges {
            node {
              fields {
                slug
                basePagePath
              }
              data {
                organization {
                  repository {
                    resources {
                      yaml: text
                    }
                  }
                }
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allGithubData.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.basePagePath + node.fields.slug,
          component: path.resolve(`./src/templates/github.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
            yaml: node.data.organization.repository.resources.yaml,
          },
        });
      });
      resolve();
    });
  });
};
