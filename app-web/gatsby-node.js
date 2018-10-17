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
      name: `pageType`,
      value: 'dynamic',
    });
    createNodeField({
      node,
      name: `basePagePath`,
      value: 'learn/',
    });
    // modify site page nodes to include some navigational data which may useful at a later stage
  } else if (node.internal.type === 'SitePage') {
    if (node.fields && node.fields.pageType === 'dynamic') {
      createNodeField({
        node,
        name: 'linkName',
        value: node.fields.slug,
      });
    } else {
      let linkName = node.path.split('/').filter(part => part.length > 0);
      createNodeField({
        node,
        name: 'linkName',
        value: linkName.length > 0 ? linkName[linkName.length - 1] : 'home',
      });
    }
    createNodeField({
      node,
      name: `path`,
      value: node.path,
    });
  }
};

exports.createPages = require('./gatsby/createPages');