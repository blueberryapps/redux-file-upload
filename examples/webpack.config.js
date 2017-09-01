const path = require('path');
const webpack = require('webpack');

const PORT = process.env.PORT || 3000;

module.exports = {
  entry: {
    app: [
      `webpack-hot-middleware/client?path=http://localhost:${PORT}/__webpack_hmr`,
      './client.js'
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },
};
