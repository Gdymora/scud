const winston = require('winston');

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};

module.exports = logger;