const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./udb/index.ts",
  plugins: [
    /*new HtmlWebpackPlugin({
      title: 'use plugin',
      filename: 'index.html'
    }),*/
    new webpack.ProvidePlugin({
      process: "process/browser"
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      "https": require.resolve("https-browserify"),
      "url": require.resolve("url/"),
      "path": require.resolve("path-browserify"),
      "http": require.resolve("stream-http"),
      "buffer": require.resolve("buffer/"),
      "process": require.resolve("process/browser"),
      "fs": false,
      "child_process": false,
      "readline": false
    }
  },
  output: {
    filename: "udb.js",
    path: path.resolve(__dirname, "out/udb")
  }
}
