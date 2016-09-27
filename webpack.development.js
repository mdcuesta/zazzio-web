/* eslint-disable */
var webpack = require('webpack');
var path = require('path');
var pjson = require('./package.json');
var version = pjson.version;
var jsxPath = path.join(__dirname, 'client');
var jsPath = path.join(__dirname, 'assets', version, 'javascripts');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [{
    description: 'Transpile jsx/react to native javascript that runs on browsers.',
    entry: {
      // root pages
      home: jsxPath + '/home.js',
      login: jsxPath + '/login.js',

      // sign up pages
      'sign-up': jsxPath + '/sign-up.js',
      'account-confirmation': jsxPath + '/account-confirmation.js',
      'sign-up-cancel': jsxPath + '/sign-up-cancel.js',

      // user pages
      'user-dashboard': jsxPath + '/user-dashboard.js',
      'user-profile': jsxPath + '/user-profile.jsx',
    },
    output: {
      path: jsPath,
      filename: '[name].js'
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          compact: false,
          plugins: ['transform-runtime']
        },    
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
      new webpack.optimize.DedupePlugin()
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
