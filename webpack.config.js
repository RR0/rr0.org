const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

const PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
  entry: './js/index.ts',
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
  },
  module: {
    loaders: [
      {test: /\.tsx?$/, loader: 'ts-loader'},
      {test: /\.js$/, loaders: ['ng-annotate-loader']},
      {test: /\.scss$/, use: ExtractTextPlugin.extract({fallback: "style-loader", use: ["css-loader", "sass-loader"]})}
    ],
  },
  devtool: "source-map",
  externals: {
    'angular': 'angular',
    'google': 'google',
  },
  output: {
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