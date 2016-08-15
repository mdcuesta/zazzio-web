var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var copy = require('copy-webpack-plugin');
var glob = require("glob");

const appName = 'zazzio';

var dist = __dirname;
var distAssets = path.join(dist, 'assets');
var jsxPath = path.join(__dirname, 'client');
var jsAssetsPath = path.join(distAssets, 'javascripts');

module.exports = [{
    description: 'Transpile jsx to native javascript that runs on browsers.',
    entry: {
      index: jsxPath + '/index.jsx'
    },
    output: {
      path: jsAssetsPath,
      filename: '[name].js'
    },
    module: {
      loaders: [{
        test: /\.jsx$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          compact: true,
          plugins: ['transform-runtime']
        }
      }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        comments: false
      })
    ]
  }, {
    description: 'Transpile server scripts to native javascript and copy required files.',
    entry: [path.join(__dirname, '/bin/www')],
    target: 'node',
    node: {
      __dirname: true
    },
    externals: [nodeExternals()],
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: path.resolve(__dirname, 'node_modules/'),
        query: {
          presets: ['es2015', 'stage-0'],
          compact: true
        }
      }]
    },
    output: {
      filename: appName + '.compiled.js',
      path: dist
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ]
  }
]