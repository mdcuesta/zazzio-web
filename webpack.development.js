var webpack = require('webpack');
var path = require('path');

var jsxPath = path.join(__dirname, 'client');
var jsPath = path.join(__dirname, 'assets/javascripts');

module.exports = [{
    description: 'Transpile jsx/react to native javascript that runs on browsers.',
    entry: {
      index: jsxPath + '/index.jsx'
    },
    output: {
      path: jsPath,
      filename: '[name].js'
    },
    module: {
      loaders: [{
        test: /\.jsx$/,
        loaders: ['babel']
      }],
      query: {
        presets: ['es2015', 'react']
      }
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  }
]