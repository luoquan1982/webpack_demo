const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  entry: "./src/js/index.js",
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
  /*
    1.可以将node_modules中代码单独打包成一个chunk最终输出
  */
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  mode: "production"
};
