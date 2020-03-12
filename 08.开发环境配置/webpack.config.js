/**
 * 开发环境的配置:能让代码运行
 *  运行项目指令
 *      webpack 会将打包结果输出出去
 *      npx webpack-dev-server  只会在内存中编译打包,没有输出
 */

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build")
  },
  module: {
    // loader的配置
    rules: [
      {
        // 处理css资源
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        // 处理less资源
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      // 处理图片资源(只能处理样式中的图片资源)
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          // 关闭es6模块化
          esModule: false,
          name: "[hash:10].[ext]",
          outputPath: "img"
        }
      },
      // 处理html中的img图片资源
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      // 处理其他静态资源,如字体等
      {
        exclude: /\.(css|less|html|js|jpg|png|gif)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    open: true
  }
};
