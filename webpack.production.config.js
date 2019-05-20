var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var appPath = path.resolve(__dirname, 'src');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');


var config = merge(baseConfig, {
    mode: 'production',
    // We change to normal source mapping, if you need them
    devtool: 'source-map',
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
        new ExtractTextPlugin('main.css', {allChunks: true}),
        new HtmlWebpackPlugin({
            title: 'MY REACT DEMO',
            filename: 'index.html',
            template: 'index.template.html',
            favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico')
        })
    ]
});

module.exports = config;
