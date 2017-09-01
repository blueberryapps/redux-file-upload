const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config.js');
const app = express();
const compiler = webpack(config);

const PORT = process.env.PORT || 3000;

app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }));
app.use((webpackHotMiddleware)(compiler, { path: '/__webpack_hmr' }));

app.get('/', (req, res) => {
  console.log('GET /');

  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>redux-file-upload example</title>
      </head>
      <body>
        <noscript>Please enable JS.</noscript>
        <div id="app"></div>
        <script src="${config.output.publicPath}app.js"></script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
