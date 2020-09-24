var express = require('express');
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.dev.config.js');
var httpProxy = require('http-proxy');
var fs = require('fs');
var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});
var app = express();
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8088 : 8088;

if (!isProduction) {
  var bundleStart = null;
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.use(express.static('lib'));

  app.all('/react-demo/*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });

}else{
  app.use('/', express.static('dist'));
  console.log('======== you must do \'npm run build\' before using this config ==========');

  app.all('/react-demo/*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// And run the server
app.listen(port, function () {
  console.log('Server running on port ' + port);
});
