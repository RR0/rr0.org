const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({mode}) => {
  return {
    mode,
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    devtool: mode === 'development' ? 'source-map' : 'none'
  };
};
