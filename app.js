const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('config');
const sanitizer = require('sanitizer');
const util = require('util');

client.on('ready', () => {
    console.log("I am ready!");
});

client.on('message', message => {
    if (isOurMessage(message)) {
        console.log("Somebody typed /whoisdown");
        let gameName = getGameName(message), reply ="", requestorMention=message.author.toString();
        if (gameName === "") {
            console.log("generic multiplayer request");
            reply = util.format("%s, %s is interested in multiplayer - anybody down?", config.get('recipients'), requestorMention);
        } else {
            console.log(util.format("request to play %s", gameName));
            reply = util.format("%s, %s wants to play %s - anybody down?", config.get('recipients'), requestorMention, gameName);
        }

        message.channel.sendMessage(reply);
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