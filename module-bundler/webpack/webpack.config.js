const paths = require("./config/paths");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    clean: true,
    // publicPath: paths.publicUrl,
    path: paths.appBuild,
    assetModuleFilename: "static/media/[name].[hash][ext]",
  },
  resolve: {
    alias: {
      "@public": path.resolve(__dirname, "public"),
    },
  },
  devServer: {
    // static: {
    //   directory: paths.appPublic,
    //   publicPath: paths.publicUrl,
    // },
    historyApiFallback: {
      index: paths.publicUrl,
      disableDotRule: true,
    },
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            "@babel/preset-env",
            [
              "@babel/preset-react",
              {
                runtime: "automatic",
              },
            ],
          ],
        },
      },
      {
        oneOf: [
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset",
          },
          {
            test: /\.css$/,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: ["postcss-preset-env", "autoprefixer"],
                  },
                },
              },
            ],
          },
          {
            test: /\.s(c|a)ss$/,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        "postcss-flexbugs-fixes",
                        "postcss-preset-env",
                        {
                          browsers: "last 2 versions",
                          autoprefixer: {
                            flexbox: true,
                          },
                        },
                      ],
                    ],
                  },
                },
              },
              "sass-loader",
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(paths.appPublic, "index.html"),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    // runtimeChunk: "single",
  },
};
