var Webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var appPath = path.resolve(__dirname, 'src');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';


var config = {
  context: __dirname,
  debug: true,
  devtool: 'source-map',
  entry: {
    index: [
      'babel-polyfill',
      path.resolve(appPath, 'index.js'),
      hotMiddlewareScript
    ],
    vendors: ['react','react-dom','redux','react-redux']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8088/dist/'
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
  module: {
    noParse: [
    ],
    loaders: [{
      test: /\.js?$/,
      loader: ['babel-loader'],
      include: [path.resolve(__dirname, "src")],
      // Options to configure babel with
      query: {
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css?sourceMap',
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
      loader: 'url-loader?limit=8192',
    }, {
      include: /\.json$/,
      loaders: ["json-loader"]
    }] // inline base64 URLs for <=8k images, direct URLs for the rest
  },
  externals: {
    "jquery": "jQuery"
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      '__DEVTOOLS__': false
    }),
    new Webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoErrorsPlugin()
  ]
};


module.exports = config;