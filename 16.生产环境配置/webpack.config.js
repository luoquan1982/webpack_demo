const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MinCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

// 定义nodejs环境变量:决定使用browserslist的哪个环境
process.env.NODE_ENV = "development";

// 复用loader
const commonCssLoader = [
  MinCssExtractPlugin.loader,
  "css-loader",
  {
    // 还需要在package.json中定义browserslist
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      pulgins: () => [require("postcss-preset-env")()]
    }
  }
];

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build")
  },
  modules: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader]
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, "less-loader"]
      },
      /*
        正常来讲,一个文件只能被一个loader处理
        当一个文件要被多个loader处理,那么一定要指定loader执行的先后顺序
          先执行eslint,再执行babel
      */
      {
        // 在package.json中eslintConfig --airbnb enfroce: pre 强调eslint-loader必须先于babel-loader执行
        test: /\.js$/,
        exclude: /node_modules/,
        enfroce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      {
        // 对js做兼容性处理
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          preset: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "useage",
                corejs: { version: 3 },
                targets: {
                  chrome: "60",
                  firefox: "50"
                }
              }
            ]
          ]
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: "[hash:10].[ext]",
          outputPath: "imgs",
          // url-loader默认使用的是es6的模块化
          esModule: false
        }
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        exclude: /\.(js|css|less|html|jpg|png|gir)/,
        loader: "file-loader",
        options: {
          outputPath: "media"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new MinCssExtractPlugin({
      filename: "css/built.css"
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: "production"
};
