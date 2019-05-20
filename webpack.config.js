var path = require('path');
var appPath = path.resolve(__dirname, 'src');


var config = {
    context: __dirname,
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
    resolve: {
        extensions: ['.js', '.jsx'],
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
        rules: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            include: [path.resolve(__dirname, "src")],
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader']
        }, {
            test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader",
            options: {
                limit: 10000,
                mimetype: "application/font-woff"
            }
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader",
            options: {
                limit: 10000,
                mimetype: "application/octet-stream"
            }
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader",
            options: {
                limit: 10000,
                mimetype: "application/image/svg+xml"
            }
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 8192
            }
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader"
        }] // inline base64 URLs for <=8k images, direct URLs for the rest
    },
    externals: {
        "jquery": "jQuery"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    filename: "vendors.js",
                    chunks: "all"
                }
            }
        }
    }
};


module.exports = config;