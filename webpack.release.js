/* eslint-disable */
var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var glob = require("glob");
var pjson = require('./package.json');

var version = pjson.version;
var appName = 'zazzio';

var dist = __dirname;
var distAssets = path.join(dist, 'assets');
var jsxPath = path.join(__dirname, 'client');
var jsAssetsPath = path.join(distAssets, version, 'javascripts');

module.exports = [{
    description: 'Transpile jsx to native javascript that runs on browsers.',
    entry: {
      home: jsxPath + '/home.js',
      login: jsxPath + '/login.js'
    },
    output: {
      path: jsAssetsPath,
      filename: '[name].js'
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
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
        'window.jQuery': 'jquery',
        'window.Tether': 'tether'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        comments: false
      }),
      new webpack.DefinePlugin({
        "process.env": { 
           NODE_ENV: JSON.stringify("production")
         }
      }),
      new webpack.optimize.DedupePlugin()
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
      }, {
        test: /\.json$/,
        loader: 'json',
        exclude: path.resolve(__dirname, 'node_modules/'),
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
  }, {
    description: 'Copy static files to assets folder',
    context: path.join(__dirname),
    plugins: [
      new CopyWebpackPlugin([
         { from: 'styles/fonts', to: `assets/${version}/fonts` },
         { from: 'styles/images', to: `assets/${version}/images` },
      ], { copyUnmodified: false })
    ],
    output: {
      filename: 'test.js'
    }
  }
]