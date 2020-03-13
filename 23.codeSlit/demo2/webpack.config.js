const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  // entry: "./src/js/index.js",
  entry: {
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
  /*
    可以将node_modules中代码单独打包成一个chunk最终输出
    自动分析多入口chunk中,有没有公共的文件.如果有会打包成单独的一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  mode: "production"
};
