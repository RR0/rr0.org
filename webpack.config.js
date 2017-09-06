const webpack = require('webpack');

const PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
  context: __dirname + '/dist',
  entry: './index.js',
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['ng-annotate-loader']}
    ],
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    }]
  },
  externals: {
    'angular': 'angular',
    'google': 'google',
  },
  output: {
    filename: 'dist/rr0.js'
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  ] : [],
};