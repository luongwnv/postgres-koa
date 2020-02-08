var winston = require('winston');

// write log for systems
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'log/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'log/debug.log', level: 'debug' }),
        new winston.transports.File({ filename: 'log/combined.log' })
    ]
});

logger.add(new winston.transports.Console({
    format: winston.format.simple()
}));

module.exports = logger;