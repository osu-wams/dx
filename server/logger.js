const { createLogger, format, transports, config: winstonConfig } = require('winston');
const path = require('path');
const fs = require('fs');
const config = require('config');

const ENV = config.get('env');
const LOG_DIR = path.join(__dirname, '../logs');

const { combine, timestamp, json } = format;

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

const loggerOptions = {
  levels: winstonConfig.npm.levels,
  format: combine(timestamp(), json())
};

if (ENV === 'development') {
  loggerOptions.transports = [
    new transports.Console(),
    new transports.File({ filename: `${LOG_DIR}/dev.log` })
  ];
} else {
  loggerOptions.transports = [new transports.File({ filename: `${LOG_DIR}/combined.log` })];
}

const logger = createLogger(loggerOptions);

module.exports = logger;
