const autoprefixer = require('autoprefixer');

exports.modifyWebpackConfig = ({ config, env }) => {
  // switch allows to change config based on environment
  // eslint-disable-next-line
  switch (env) {
    case 'develop':
      config.preLoader('eslint-loader', {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      });
      config.merge({
        postcss: [
          require('postcss-flexbugs-fixes'), // eslint-disable-line
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

exports.onCreatePage = require('./gatsby/onCreatePage');
exports.createPages = require('./gatsby/createPages');
