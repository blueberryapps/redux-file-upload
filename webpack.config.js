const path = require('path');
const webpack = require('webpack');

// const CleanWebpackPlugin = require('clean-webpack-plugin');

const PORT = process.env.PORT || 3000;

module.exports = {
  entry: {
    app: [
      `webpack-hot-middleware/client`,
      './examples/index.js'
    ],
  },
  devtool: 'inline-source-map',
  // devServer: { inline: true },
  plugins: [
    // new CleanWebpackPlugin(['lib']),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'examples', 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },
};
