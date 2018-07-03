var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var appPath = path.resolve(__dirname, 'src');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

var config = {

  // We change to normal source mapping, if you need them
  devtool: 'source-map',
  entry: {
    index: [
      'babel-polyfill',
      path.resolve(appPath, 'index.js')
    ],
    vendors: ['react','react-dom','redux','react-redux']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [path.resolve(__dirname, "src")],
      // Options to configure babel with
      query: {
        plugins: ['transform-runtime']
      }
    },{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }, {
      test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml"
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=8192'
    }, {
      include: /\.json$/,
      loaders: ["json-loader"]
    }] // inline base64 URLs for <=8k images, direct URLs for the rest
  },
  resolve: {
      extensions: ['', '.js', '.jsx'],
      alias: {
        'ie': 'component-ie'
      }
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  externals: {
    "jquery": "jQuery"
  },
  plugins: [
    new Webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('main.css', { allChunks: true }),
    new Webpack.optimize.CommonsChunkPlugin({name:'vendors', filename:'vendors.js'}),
    new Webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      '__DEVTOOLS__': false
    }),
    new Webpack.optimize.DedupePlugin(),
    new Webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: true
      }
    }),
    new HtmlWebpackPlugin({
      title: 'MY REACT DEMO',
      filename: 'index.html',
      template: 'index.template.html',
      favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico')
    })
  ]
};

module.exports = config;
