const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, './example/index.js'),
  devtool: 'source-map',
  devServer: {
    contentBase: resolve(__dirname, "dist"),
    open: true
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: "main.js"
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: resolve(__dirname, './example/index.html')
    })
  ]
}