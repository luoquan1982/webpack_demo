const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    // 文件名称(指定名称+目录)
    filename: "js/[name].js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
  // 解析模块的规则
  resolve: {
    // 配置路径别名
    alias: {
      // 配置解析模块路径别名:优点 简写路径 缺点 路径没有提示
      $css: resolve(__dirname, "src/css")
    },
    // 配置省略文件路径的后缀名
    extensions: [".js", ".jsx", ".json", ".css"],
    // 告诉webpack解析模块是去哪个目录找
    modules: [resolve(__dirname, "../../node_modules"), "node_modules"]
  }
};
