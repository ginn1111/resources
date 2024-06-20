// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = require('webpack').container;
const mfeConfig = require('@repo/configs/mfe.config');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: mfeConfig.checkout_app.port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      excludeChunks: [mfeConfig.checkout_app.name],
    }),
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: mfeConfig.checkout_app.name,
      filename: mfeConfig.fileName,
      remotes: {
        shared_store: mfeConfig.getRemoteEntry('shared_store'),
      },
      exposes: mfeConfig.exposes.checkout_app,
      shared: mfeConfig.shared.checkout_app,
    }),
  ],
  resolve: {
    extensions: [
      '.wasm',
      '.ts',
      '.tsx',
      '.mjs',
      '.cjs',
      '.js',
      '.json',
      '.js',
      '.jsx',
      '.vue',
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }
  return config;
};
