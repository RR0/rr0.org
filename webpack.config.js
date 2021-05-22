const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    index: "./src/rr0.ts"
  },
  mode: process.env.NODE_ENV || "production",
  devtool: "source-map",
  devServer: {
    contentBase: "./dist"
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: "RR0",
        lang: "fr",
        template: "index.native.html",
        js: ["bundle.js"]
      }
    )
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",   // Creates `style` nodes from JS strings
          "css-loader",     // Translates CSS into CommonJS
          "sass-loader"     // Compiles Sass to CSS
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts"],
    modules: [
      path.resolve("./node_modules"),
      path.resolve("./")
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
}
