import { BotEvent } from "../types";
import { Client, Events, Interaction } from "discord.js";

const event: BotEvent = {
    name: Events.InteractionCreate,
    once: false,
    execute(interaction: Interaction, client: Client) {
        if(interaction.isChatInputCommand()) {
            const commands = client.commands.find(cmd => cmd.command.data.name === interaction.commandName);
            if(!commands) {
                interaction.reply({ content: "Commande obsolète" });
                return;
            }
    
            commands.command.execute(interaction);
        }
    },
}

export default event;