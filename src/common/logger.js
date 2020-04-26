const path = require('path');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    format.prettyPrint()
  ),
  transports: [
    new transports.Console({
      level: 'info'
    }),
    new transports.File({
      level: 'error',
      filename: path.join(__dirname, '../logs/error.log')
    }),
    new transports.File({
      level: 'info',
      filename: path.join(__dirname, '../logs/info.log')
    })
  ]
});

module.exports = logger;
