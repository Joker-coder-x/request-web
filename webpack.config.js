const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: "./index.js",
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    open: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js"
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html'
    })
  ]
}