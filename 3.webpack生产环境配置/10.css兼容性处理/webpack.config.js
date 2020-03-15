const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 设置nodejs环境变量(如果不设置,则默认是生产环境 production)
// process.env.NODE_ENV = "development";

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          /*
            css兼容性处理:postcss --> postcss-loader postcss-preset-env

            帮助postcss找到package.json中browserslist里面的配置,通过配置加载指定的css兼容性样式

            详情可以在github browserslist中查询
            "browserslist": {
              // 开发环境 --> 设置node环境变量:process.env.NODE_ENV = development
              "development": [
                // 兼容最近的chrome版本
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
              ],
              // 生产环境:默认是看生产环境
              "production": [
                // 大于99.8的浏览器
                ">0.2%",
                // 不需要支持已经"死掉"的浏览器
                "not dead",
                // 不需要支持op_mini浏览器的所有浏览器(op_mini已经死亡了)
                "not op_mini all"
              ]
            }

          */
          // 使用loader的默认配置
          // postcss-loader,
          // 修改loader的配置
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                // postcss的插件
                require("postcss-preset-env")()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "css/built.css"
    })
  ],
  mode: "development"
};
