// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const mfeConfig = require('@repo/configs/mfe.config');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';
const { ModuleFederationPlugin } = require('webpack').container;

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
  devServer: {
    port: mfeConfig.shared_store.port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
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
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      filename: mfeConfig.fileName,
      name: mfeConfig.shared_store.name,
      exposes: mfeConfig.exposes.shared_store,
      shared: mfeConfig.shared.shared_store,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
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
