const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('config');
const sanitizer = require('sanitizer');
const util = require('util');
const logger = require('./logger');

logger.info(util.format("whoisdown version %s", config.get('version')));

client.on('ready', () => {
    logger.debug('ready!');
});

client.on('message', message => {
    if (isOurMessage(message)) {
        logger.silly(message.content);
        let gameName = getGameName(message), reply ="";
        if (gameName === "") {
            logger.debug(util.format("%s wants to play multiplayer", message.author.username));
            reply = getGenericMultiplayerResponse(message.author);
        } else {
            logger.debug(util.format("%s wants to play %s", message.author.username, gameName));
            reply = getSpecificMultiplayerResponse(message.author, gameName);
        }
        message.channel.sendMessage(reply);

        // remove original message
        message.delete(config.get('deleteDelay'));
    }
});

client.login(config.get('token'));

/**
 * Is this a /whoisdown message?
 * @param message
 * @returns {boolean}
 */
function isOurMessage(message) {
    return (message.content.startsWith(config.get('commandPrefix')));
}

/**
 * Retrieve sanitized game name from user input
 * for /whoisdown Pulsar returns "Pulsar"
 * for /whoisdown returns ""
 * @param message
 * @returns {string}
 */
function getGameName(message) {
    var trimmed = message.content.trim();
    var commandLength = config.get('commandPrefix').length;
    if (trimmed.length > commandLength) {
        let rawName = trimmed.substr(commandLength).trim();
        let gameName = sanitizer.sanitize(rawName);
        return gameName;
    } else {
        return "";
    }
}

/**
 * Bot sends this message in response to /whoisdown with no game argument
 * @param {User} requestor
 * @returns {string}
 */
function getGenericMultiplayerResponse(requestor) {
    return util.format("%s, %s is interested in multiplayer - anybody down?", config.get('recipients'), requestor.toString());
}

/**
 * Bot sends this message in response to /whoisdown {game}
 * @param {User} requestor
 * @param {string} game
 * @returns {string}
 */
function getSpecificMultiplayerResponse(requestor, game) {
    return util.format("%s, %s wants to play **%s** - anybody down?", config.get('recipients'), requestor.toString(), game);
}
