const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  // entry: "./src/js/index.js",
  entry: {
    // 多入口:有几个入口,最终输出就有几个bundle,
    index: "./src/js/index.js",
    test: "./src/js/test.js"
  },
  output: {
    // 取文件名[name],就是上面entry对象中的key值(注意不是value值)
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname, "build")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  mode: "production"
};
