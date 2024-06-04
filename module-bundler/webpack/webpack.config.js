const paths = require('./config/paths')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevMode = process.env.NODE_ENV === 'development'

function getStyleLoaders(cssOptions, preprocessor) {
  const loaders = [
    {
      loader: isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
    },
    { loader: 'css-loader', options: cssOptions },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            'postcss-flexbugs-fixes',
            [
              'postcss-preset-env',
              {
                browsers: 'last 2 versions',
                autoprefixer: {
                  flexbox: 'no-2009',
                },
              },
            ],
            'postcss-normalize',
          ],
        },
      },
    },
  ].filter(Boolean)

  if (preprocessor) {
    loaders.push(preprocessor)
  }

  return loaders
}

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: isDevMode ? 'development' : 'production',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    clean: true,
    publicPath: paths.publicUrl,
    chunkFilename: 'static/js/[name].[contenthash].js',
    path: paths.appBuild,
    assetModuleFilename: 'static/media/[name].[hash][ext]',
  },
  resolve: {
    alias: {
      '@public': path.resolve(__dirname, 'public'),
    },
  },
  devServer: {
    static: {
      directory: paths.appPublic,
      publicPath: paths.publicUrl,
    },
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
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-env',
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
              },
            ],
          ],
        },
      },
      {
        oneOf: [
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset',
          },
          {
            test: /\.css$/,
            use: getStyleLoaders({
              importLoaders: 1,
            }),
          },
          {
            test: /\.s(c|a)ss$/,
            use: getStyleLoaders(
              {
                importLoaders: 2,
              },
              'sass-loader',
            ),
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(paths.appPublic, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[name].[contenthash].css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all', // dedup module when has m
    },
    runtimeChunk: 'single',
  },
}
