const winston = require('winston');

const { logLevel } = require('./config');

winston.level = logLevel;

module.exports = winston;
