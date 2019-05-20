var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var appPath = path.resolve(__dirname, 'src');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


var config = merge(baseConfig, {

    // We change to normal source mapping, if you need them
    devtool: 'source-map',
    entry: {
        index: [
            path.resolve(appPath, 'index.js')
        ],
        vendors: ['react', 'react-dom', 'redux', 'react-redux']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader",
                // publicPath: "/dist"
            })
        }] // inline base64 URLs for <=8k images, direct URLs for the rest
    },
    plugins: [
        new Webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin('main.css', {allChunks: true}),
        new Webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            },
            '__DEVTOOLS__': false
        }),
        new Webpack.optimize.DedupePlugin(),
        new Webpack.optimize.UglifyJsPlugin({sourceMap: true}),
        new HtmlWebpackPlugin({
            title: 'MY REACT DEMO',
            filename: 'index.html',
            template: 'index.template.html',
            favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico')
        })
    ]
});

module.exports = config;
