const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'build/');
const APP_DIR = path.resolve(__dirname, 'src/');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  devtool: 'eval-source-map',
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: ['node_modules'],
  },
  devServer: {
    contentBase: APP_DIR,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    port: 8081,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      template: './src/index-templ.html',
    }),
  ],
};

module.exports = config;
