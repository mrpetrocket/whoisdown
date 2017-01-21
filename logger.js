const config = require('config');
const winston = require('winston');

module.exports = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: config.get('logLevel'),
            // I may or may not have added a third party logger just to get colors
            colorize: true
        })
    ]
});