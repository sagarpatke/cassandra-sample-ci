const express = require('express');

const app = express();

app.use(require('body-parser').json());

app.use('/api/v1/cartoons', require('./api/cartoons'));

app.use((err, req, res, next) => {
  if (err) { res.status(400).json({ message: err.message }); return; }
  next();
});

module.exports = app;
