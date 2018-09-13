exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case 'develop':
      config.preLoader('eslint-loader', {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      });
      break;
    default:
      return config;
  }
  return config;
};

// exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
// };

// exports.createPages = ({ graphql, boundActionCreators }) => {
// };
