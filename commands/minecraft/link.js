const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, RESTJSONErrorCodes } = require("discord.js");
const { resolve } = require("mathjs");
const ms = require("ms");
const minecraftPlayer = require("minecraft-player")
const mysql = require("mysql");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Permet de relier son compte minecraft à discord")
    .setDMPermission(false)
    .addIntegerOption(option => option 
        .setMaxValue(9999)
        .setMinValue(1)
        .setName("code")
        .setDescription("Code fournis sur minecraft avec la commande /link")
        .setRequired(true)
    ),
    
    async execute(interaction) {

        const { options, client } = interaction;

        const code = options.get("code").value;

        client.db.query(`SELECT * FROM link_verif WHERE code = ${code}`, async (err, req) => {
            if(req.length > 0) {              

                const uuid = req[0].minecraft_uuid;

                client.db.query(`INSERT INTO link (minecraft_uuid, discord_id) VALUES ('${uuid}', '${interaction.user.id}')`);
                client.db.query(`DELETE FROM link_verif WHERE code = ${code}`);

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
};