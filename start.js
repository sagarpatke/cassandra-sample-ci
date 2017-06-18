#!/usr/bin/node

const { port } = require('./config');

const app = require('./app');

const winston = require('./winston');

app.listen(port, () => {
  winston.log('info', `Express server listening on port ${port}`);
});
