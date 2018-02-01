const express = require('express');
const ReactSSR = require('react-dom/server');
const serverEntry = require('../dist/server-entry').default;
const app = express();

app.get('', function (req, res) {
  const appString = ReactSSR.renderToString(serverEntry);
  res.send(appString);
})

app.listen(3000,function () {
  console.log('server on localhost:3000');
})