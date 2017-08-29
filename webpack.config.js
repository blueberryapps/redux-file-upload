const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './examples/index',
    lib: './src/index'
  },
  devtool: 'inline-source-map',
  plugins: [
    // new CleanWebpackPlugin(['lib']),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib'),
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
    ]
  },
};
