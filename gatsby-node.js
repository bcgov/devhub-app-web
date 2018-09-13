const autoprefixer = require('autoprefixer');
exports.modifyWebpackConfig = ({ config, env }) => {
  // switch allows to change config based on environment
  switch (env) {
    case 'develop':
      config.preLoader('eslint-loader', {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      });
      break;
  }
  // add post css plugins to all environments
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
    ]
  });
  return config;
};

// exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
// };

// exports.createPages = ({ graphql, boundActionCreators }) => {
// };
