import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
export const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Lier ton compte minecraft à ton compte discord.')
        .addIntegerOption(opt => opt.setName("code").setDescription("Code a 4 chiffres optenue grace à la commande /link dans minecraft").setRequired(true)),
    execute: async (interaction) => {
    
        const { options } = interaction;

        const code = options.get("code").value;

        interaction.client.conn.query(`SELECT * FROM link_verif WHERE code = ${code}`, async (err, req) => {
            if(req.length > 0) {              

                const uuid = req[0].minecraft_uuid;

                interaction.client.conn.query(`INSERT INTO link (minecraft_uuid, discord_id) VALUES ('${uuid}', '${interaction.user.id}')`);
                interaction.client.conn.query(`DELETE FROM link_verif WHERE code = ${code}`);

                try {
                    const response = await fetch(`https://api.mojang.com/user/profile/${uuid}`)
            
                    if(!response.ok) {
                        throw new Error(`Error: ${response.status} ${response.statusText}`)
                    }
            
                    const responses = await response.json();
                    interaction.reply({ content: `Tu es maintenant lié avec le compte minecraft \`${responses.name}\``, ephemeral: true })

                } catch (err) {
                    console.log(`Failed to fetch Minecraft profile: ${err}`);
                }

            } else {
                interaction.reply({ content: `Le code saisi est incorrect ou a expiré.\nFaites \`/link\` sur minecraft pour obtenir un nouveau code !`, ephemeral: true });
            }            
        })
    }
}