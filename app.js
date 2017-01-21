const Discord = require('discord.js');
const client = new Discord.Client();
var config = require('config');

client.on('ready', () => {
    console.log("I am ready!");
});

client.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong')
    }
});

client.login(config.get('token'));