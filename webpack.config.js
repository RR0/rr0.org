const webpack = require('webpack');

const PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
  context: __dirname + '/dist',
  entry: './index.js',
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['ng-annotate-loader']}
    ]
  },
 /* externals: {
    'angular': 'angular'
  },*/
  output: {
    filename: 'dist/rr0.js'
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  ] : [],
};