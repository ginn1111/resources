// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const mfeConfig = require('@repo/configs/mfe.config');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = !isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    port: mfeConfig.app_shell.port,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin(),
    new ModuleFederationPlugin({
      name: mfeConfig.app_shell.name,
      remotes: {
        product_app: mfeConfig.getRemoteEntry('product_app'),
        checkout_app: mfeConfig.getRemoteEntry('checkout_app'),
      },
      shared: mfeConfig.shared.app_shell,
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
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
              },
            ],
            [
              '@babel/preset-env',
              {
                targets: 'defaults',
              },
            ],
          ],
        },
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
