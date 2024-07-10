const Discord = require("discord.js");
const { status } = require('minecraft-server-util');
const { loadDatabase } = require("../../handlers/databaseHandlers");
const { google } = require("googleapis");
let db = loadDatabase()

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        console.log(`${client.user.username} is now online`)    

        let statuses = [
            () => `play.openmc.fr`,
            () => `www.wiki.openmc.fr`
        ]

        client.db = await loadDatabase();

        let i = 0;
        setInterval(() => {
            client.user.setActivity(statuses[i](), { type: Discord.ActivityType.Playing })
            i = ++i % statuses.length
        }, 5000)
    },
};