var Webpack = require('webpack');
var path = require('path');
var appPath = path.resolve(__dirname, 'src');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');


var config = merge(baseConfig,{
    devtool: 'eval-source-map',
    entry: {
        index: [
            path.resolve(appPath, 'index.js'),
            hotMiddlewareScript
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
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                    }
                }],
        }]
    },
    plugins: [
        new Webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            },
            '__DEVTOOLS__': false
        }),
        new Webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NoEmitOnErrorsPlugin()
    ]
});


module.exports = config;