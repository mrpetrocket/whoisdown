const config = require('config');
const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
    level: config.get('logLevel'),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple(),
            ),        
        }),
    ],
});