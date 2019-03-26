const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/public');
const SERVER_DIR = path.join(__dirname, '/server');

const client = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    publicPath: DIST_DIR //
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const server = {
  entry: `${SERVER_DIR}/index.js`,
  output: {
    filename: 'serverbundle.js',
    path: SERVER_DIR,
    publicPath: DIST_DIR //
  },
  target: 'node',
  mode: 'production',
  node: { //
    __dirname: false //
  }, //
  externals: [nodeExternals(), {PageApp: 'PageApp'}],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = [ client, server ];