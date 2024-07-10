const Discord = require('discord.js');
const client = new Discord.Client({ intents: [ Object.keys(Discord.GatewayIntentBits) ], partials: [ Object.keys(Discord.Partials) ] })
const { loadCommands } = require('./handlers/commandHandlers')
const { loadDatabase } = require('./handlers/databaseHandlers')
const { loadEvents } = require('./handlers/eventHandlers')
require('dotenv').config()

client.commands = new Discord.Collection();

client.login(process.env.TOKEN).then(() => {
    loadEvents(client)
    loadCommands(client)
});

module.exports = { client }