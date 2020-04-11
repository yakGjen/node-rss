const path = require('path');
// const winston = require('winston');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(format.timestamp(), format.prettyPrint()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, '../logs/info.log')
    })
  ]
});

module.exports = logger;
