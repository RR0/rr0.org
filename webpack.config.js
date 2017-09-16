const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

const PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
  context: __dirname + '/dist',
  entry: './js/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['ng-annotate-loader']
      },
      {
        test: /\.scss$/, use:
        ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }],
  },
  devtool: "source-map",
  externals: {
    'angular': 'angular',
    'google': 'google',
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: 'rr0.js'
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    }),
    new ExtractTextPlugin("rr0.css")
  ] : [
    new ExtractTextPlugin("rr0.css")
  ],
};