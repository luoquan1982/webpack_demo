const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        // 要使用多个loader处理use
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        // 默认处理不了html中img图片
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        // 使用一个loader
        // 下载url-loader file-loader
        loader: "url-loader",
        options: {
          // 当发现图片大小小于8Kb,就会被base64处理
          // base64优点:可以减少请求数量(减轻服务器压力)
          // base64缺点:图片体积更大(文件请求速度更慢)
          limit: 8 * 1024,
          // 问题:因为url-loader默认使用es6模块化解析,而html-loader引入图片是commonjs
          // 解析时会处问题 [object Module]
          // 解决:关闭url-loader的es6模块化,使用commonjs解析
          esModule: false,
          // 给图片进行重命名
          // [hash:10]取图片的hash前10位
          // [ext]取文件原扩展名
          name: "[hash:10].[ext]"
        }
      },
      {
        test: /\.html$/,
        // html-loader:处理html文件img图片(负责引入img,从而能被url-loader处理)
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  mode: "development"
};
