const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    // 文件名称(指定名称+目录)
    filename: "js/[name].js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/,
        // 多个loader用use
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        // 单个loader用loader
        loader: "eslint-loader",
        // 不检查node_modules文件夹下的js文件
        exclude: /node_modules/,
        // 只检查src下的js文件
        include: resolve(__dirname, "src"),
        // 对于匹配规则命中的文件,优先执行此loader(eslint-loader)进行检查
        enforce: "pre"
        // 对于匹配规则命中的文件,最后执行此loader(eslint-loader)进行检查
        // enforce: "post"
      },
      {
        // 以下配置只会生效一个
        oneOf:[]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "development"
};
