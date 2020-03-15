const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    // 文件名称(指定名称+目录)
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname, "build"),
    chunkFilename: "js/[name].[contenthash:10]_chunk.js"
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
  mode: "production",
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
  },
  optimization: {
    splitChunks: {
      chunks: "all"
      // 默认值,可以不写~
      /* minSize: 30 * 1024, // 分割的chunk最小为30kb(小于30kb就不分割了)
      maxSize: 0, // 最大没有限制
      minChunks: 1, // 要提取的chunks最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
      maxInitialRequest: 3, // 入口js文件最大并行请求数量
      automaticNameDelemiter: "~", // 名称连接符
      name: true, // 可以使用命令规则
      cacheGroups: {
        // 分割chunk的组
        vendors: {
          // node_modules文件会被打包到 vendors 组的chunk中. --> vendors~×××.js
          // 满足上面的公共规则:如大小要超过30kb,至少被引用一次.
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10,
          default: {
            // 要提取的chunk最少被引用2次
            minChunks: 2,
            // 优先级
            priority: -20,
            // 如果当前要打包的模块,和之前已经被提取的模块是同一个,就会复用,而不是重新打包模块
            reuseExistingChunk: true
          }
        }
      } */
    },
    // 将当前模块记录其他模块的hash单独打包为一个文件 runtime
    // 解决:修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [
      // 配置生产环境的压缩方案: js和css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启用source-map,不然会被压缩掉的
        sourceMap: true
      })
    ]
  }
};
