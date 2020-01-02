const path = require('path');

module.exports = {
  entry: './src/index.js',
  'target': 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      'universal-user-agent': path.resolve(__dirname, 'node_modules/universal-user-agent/dist-node/index.js')
    },
    extensions: ['*', '.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};