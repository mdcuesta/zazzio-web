/* eslint-disable */
var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var sha1 = require('sha1');
var glob = require("glob");
var pjson = require('./package.json');

var version = sha1(pjson.version);
var appName = 'zazzio';

var dist = __dirname;
var distAssets = path.join(dist, 'assets');
var jsxPath = path.join(__dirname, 'client');
var jsAssetsPath = path.join(distAssets, version, 'javascripts');

const jsClientConfig = {
  cache: true,
  devtool: 'eval',
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
    'user-listings': jsxPath + '/user-listings.js',
    'user-messages': jsxPath + '/user-messages.js',
    'user-account': jsxPath + '/user-account.js',

    // listings
    'new-listing-wizard': jsxPath + '/new-listing-wizard.jsx',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: [
          jsxPath
      ],
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'react'],
        compact: true,
        plugins: ['transform-runtime']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

// en
const enPlugins = getPlugins();
enPlugins.push(new webpack.DefinePlugin({
  "process.env": { 
     LOCALE: JSON.stringify("en"),
     NODE_ENV: JSON.stringify("production"),
   }
}));
const enConfig = Object.create(jsClientConfig);
enConfig.plugins = enPlugins;
enConfig.output = {
  path: jsAssetsPath,
  filename: '[name]-en.js'
};


// tl
const tlPlugins = getPlugins();
tlPlugins.push(new webpack.DefinePlugin({
  "process.env": { 
     LOCALE: JSON.stringify("tl"),
     NODE_ENV: JSON.stringify("production"),
   }
}));
const tlConfig = Object.create(jsClientConfig);
tlConfig.plugins = tlPlugins;
tlConfig.output = {
  path: jsAssetsPath,
  filename: '[name]-tl.js'
};


// cx
const cxPlugins = getPlugins();
cxPlugins.push(new webpack.DefinePlugin({
  "process.env": { 
     LOCALE: JSON.stringify("cx"),
     NODE_ENV: JSON.stringify("production"),
   }
}));
const cxConfig = Object.create(jsClientConfig);
cxConfig.plugins = cxPlugins;
cxConfig.output = {
  path: jsAssetsPath,
  filename: '[name]-cx.js'
};


module.exports = [
  enConfig,
  tlConfig,
  cxConfig, {
    description: 'Transpile server scripts to native javascript and copy required files.',
    entry: [path.join(__dirname, '/bin/www')],
    target: 'node',
    node: {
      __dirname: true
    },
    externals: [nodeExternals()],
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: path.resolve(__dirname, 'node_modules/'),
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          compact: true
        }
      }, {
        test: /\.json$/,
        loader: 'json',
        exclude: path.resolve(__dirname, 'node_modules/'),
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    output: {
      filename: appName + '.compiled.js',
      path: dist
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        beautify: true,
        compress: { warnings: false },
        output: { comments: false, beautify: true,}
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

function getPlugins() {
  return [
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
    new webpack.optimize.DedupePlugin()
  ];
}