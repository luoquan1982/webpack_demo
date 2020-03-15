const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      /*
       * 语法检查:eslint-loader eslint
       * 注意:只检查自己写的源代码,第三方的库是不用检查的
       * 设置检查规则
       *  package.json中eslintConfig中设置~
       *    airbnb --> eslint-config-airbnb-base eslint eslint-plugin-import
       */
      {
        test: /\.(js|es|jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // 自动修复
          fix: true
        }
      },
      {
        test: /\.css$/,
        use: ["css-loader"]
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
