const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const resolve = (dir) => {
  return path.join(__dirname, '..', dir);
};

const BUILD_DIR = path.resolve(__dirname, '../', 'build');
const APP_DIR = path.resolve(__dirname, '../', 'src');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  mode: env,
  entry: ['babel-polyfill', APP_DIR + '/index.jsx'],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: APP_DIR,
    port: 8100,
    historyApiFallback: true,
    watchContentBase: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      }, {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader'
      }, {
        test: /\.(woff)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: APP_DIR + '/index.html',
      inject: true,
    })
  ]
};
