/*
  HMR:hot module replacment 模块热替换
    作用:一个模块发生变化,只会重新打包这一个模块(而不是打包所有模块)
      极大提升构建速度

    样式文件:可以使用HMR功能:因为style-loader内部实现了~
    js文件:默认不能使用HMR功能 --> 修改js代码,添加支持HMR功能的代码
      注意:HMR功能对js的处理,只能处理非入口js文件的其他文件.
    html文件:默认不能使用HMR功能,同时会导致问题:html文件不能热更新了~ (不用做HMR功能)
      解决:修改entry入口,将html文件引入
*/

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/js/index.js", "./src/index.html"],
  output: {
    filename: "./js/built.js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        // 在package.json中eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      {
        // 一下loader只会匹配一个
        // 注意:不能有两项配置处理同一种类型的文件
        oneOf: [
          {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"]
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: { version: 3 },
                  targets: {
                    chrome: "60",
                    firefox: "60",
                    ie: "9",
                    safari: "10",
                    edge: "17"
                  }
                }
              ]
            }
          },
          {
            test: /\.(jpg|png|gif)$/,
            loader: "url-loader",
            options: {
              limit: 8 * 1024,
              name: "[hash:10].[ext]",
              esModule: false,
              outputPath: "imgs"
            }
          },
          {
            test: /\.html$/,
            loader: "html-loader"
          },
          {
            exclude: /\.(js|css|less|html|jpg|png|gif)$/,
            loader: "file-loader",
            options: {
              name: "[hash:10].[ext]",
              outputPath: "media"
            }
          }
        ]
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
    port: 300,
    open: true,
    // 开启HMR功能
    // 当修改了wepack配置,新配置想要生效,必须重启webpack服务
    hot: true
  },
  devtool: "source-map"
};

/*
  source-map:一种提供源代码到构建后代码映射的技术(如果构建后代码出错了,通过映射关系可以追踪到源代码错误)
    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

    source-map:外部
      错误代码准确信息和源代码的错误位置
    inline-source-map:内联
      只生成一个内联的source-map
      错误代码准确信息和源代码的错误位置
    hidden-source-map:外部
      错误代码的错误原因,但是没有错误位置
      不能追踪到源代码的错误,只能提示到构建后代码的错误位置
    eval-source-map:内联
      每一个文件都生成对应的source-map,都在eval
      错误代码准确信息和源代码的错误位置
    nosources-source-map:外部
      错误代码准确信息,但是没有任何源代码信息
    cheap-source-map:外部
      错误代码准确信息,但是只能跟踪到行(如果一行中某个地方报错,则整个一行报错)
    cheap-module-source-map:外部
      错误代码准确信息和源代码的错误位置
      module会将loader的source map加入

    内联和外联的区别: 1.外部生成了新的文件,内联没有 2.内联构建速度更快

    开发环境:速度快,调试更友好
      速度快(eval>inline>cheap>...)
        eval-cheap-source-map(最快)
        eval-source-map
      调试更友好
        source-map
        cheap-module-source-map
        cheap-source-map
      
      --> eval-source-map / eval-cheap-module-source-map
    生成环境:源代码要不要隐藏
      内联会让代码体积变大,所以再生产环境不用内联
      nosource-source-map 全部隐藏
      hidden-source-map 只隐藏源代码,会提示构建后代码错误
*/
