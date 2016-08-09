var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var copy = require('copy-webpack-plugin');

const appName = 'zazzio';

var dist = __dirname;
var distAssets = path.join(dist, 'assets');
var jsxPath = path.join(__dirname, 'client');
var jsAssetsPath = path.join(distAssets, 'javascripts');

module.exports = [{
    description: 'Transpile jsx/react to native javascript that runs on browsers.',
    entry: {
      main: jsxPath + '/main.jsx'
    },
    output: {
      path: jsAssetsPath,
      filename: '[name].js'
    },
    module: {
      loaders: [{
        test: /\.jsx$/,
        loader: 'babel'
      }],
      query: {
        presets: ['es2015', 'react', 'stage-0']
      }
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ] 
  }, {
    description: 'Transpile server scripts to native javascript and copy required files.',
    entry: [path.join(__dirname, '/bin/www')],
    target: 'node',
    externals: [nodeExternals()],
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: path.resolve(__dirname, 'node_modules/'),
        query: {
          presets: ['es2015', 'stage-0'],
          compact: false
        }
      }],
      query: {
        presets: ['es2015', 'stage-0']
      }
    },
    output: {
      filename: appName + '.compiled.js',
      path: dist
    }
  }
]