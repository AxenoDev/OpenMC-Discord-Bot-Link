const { CommandInteraction } = require("discord.js")
const figlet = require("figlet")

module.exports = {
    name: "interactionCreate",
    
    async execute(interaction, client) {
        if(interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if(!command) {
                interaction.reply({ content: "outaded command" })
            }

            command.execute(interaction, client);
        }
    },
};