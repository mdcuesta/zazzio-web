/* eslint-disable */
var webpack = require('webpack');
var path = require('path');
var pjson = require('./package.json');
var sha1 = require('sha1');
var version = sha1(pjson.version);
var jsxPath = path.join(__dirname, 'client');
var jsPath = path.join(__dirname, 'assets', version, 'javascripts');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const jsClientConfig = {
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
}

// en
const enPlugins = getPlugins();
enPlugins.push(new webpack.DefinePlugin({
  "process.env": { 
     LOCALE: JSON.stringify("en")
   }
}));
const enConfig = Object.create(jsClientConfig);
enConfig.plugins = enPlugins;
enConfig.output = {
  path: jsPath,
  filename: '[name]-en.js'
};


// tl
const tlPlugins = getPlugins();
tlPlugins.push(new webpack.DefinePlugin({
  "process.env": { 
     LOCALE: JSON.stringify("tl")
   }
}));
const tlConfig = Object.create(jsClientConfig);
tlConfig.plugins = tlPlugins;
tlConfig.output = {
  path: jsPath,
  filename: '[name]-tl.js'
};

// cx
const cxPlugins = getPlugins();
cxPlugins.push(new webpack.DefinePlugin({
  "process.env": { 
     LOCALE: JSON.stringify("cx")
   }
}));
const cxConfig = Object.create(jsClientConfig);
cxConfig.plugins = cxPlugins;
cxConfig.output = {
  path: jsPath,
  filename: '[name]-cx.js'
};


module.exports = [
  enConfig,
  tlConfig,
  cxConfig, {
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
      'window.Tether': 'tether',
    }),
    new webpack.optimize.DedupePlugin()
  ];  
}
