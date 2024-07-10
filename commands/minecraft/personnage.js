const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, RESTJSONErrorCodes, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Events, BaseSelectMenuBuilder, SelectMenuBuilder, SelectMenuComponent } = require("discord.js");
const { resolve } = require("mathjs");
const ms = require("ms");
const mysql = require("mysql");
const { client } = require("../../main");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("personnage")
    .setDescription("Permet de créer, ou d'avoir la liste de ces personnages")
    .setDMPermission(false),
    
    async execute(interaction) {

        let conn = mysql.createConnection({
            host: "163.5.107.13",
            user: "root",
            password: "A21@ud9R",
            database: "thesite"
        })

        conn.connect();

        conn.query(`SELECT * FROM links WHERE discordID = '${interaction.user.id}'`, async (err, req) => {
            if(req.length < 1) {

                interaction.reply(`Vous devez lier votre compte minecraft à discord, pour cela, aller sur minecraft, faites \`/link\`, et sur le discord fait \`/link code\``)

            } else {
                let embed = new EmbedBuilder()
                .setTitle("Creer ton personnage")
                .setDescription("Créer tes personnages ici !")
                
                let perso1 = new ButtonBuilder();
                conn.query(`SELECT * FROM personnage1 WHERE playerUUID='${req[0].playerUUID}'`, async (no, all) => {
                    if(all.length < 1) {
                        perso1.setCustomId("perso1create").setLabel("Créer mon 1 personnage").setStyle(ButtonStyle.Primary)
                    } else {
                        perso1.setCustomId("perso1gerer").setLabel("Gérer mon personnage").setStyle(ButtonStyle.Secondary)

                    }
                
                    let perso2 = new ButtonBuilder()
                    .setCustomId("perso2create")
                    .setLabel("Créer mon 2 personnage")
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true)
                    let perso3 = new ButtonBuilder()
                    .setCustomId("perso3create")
                    .setLabel("Créer mon 3 personnage (VIP ONLY)")
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(true)
        
                    const row = new ActionRowBuilder()
                    .addComponents(perso1, perso2);

                    const row1 = new ActionRowBuilder()
                    .addComponents(perso3);
        

                    const msg = await interaction.reply({embeds: [embed], components: [row, row1], ephemeral: true})

                    const collector = msg.createMessageComponentCollector({
                        filter: i => i.user.id === interaction.user.id,
                        time: 600000
                    });

                    collector.on('collect', async i => {
                        
                        if(i.customId === "perso1gerer") {

                            let embedPerso1Gerer = new EmbedBuilder()
                            .setTitle("Gérer mon personnage n°1")
                            .setThumbnail(`https://minotar.net/avatar/${req[0].playerUserName}/100`)
                            .setDescription(`Liée sur le compte de \`${req[0].playerUUID}\`, soit \`${req[0].playerUserName}\`, commme pseudo détecter à la dernière connexion.\n
                            **__Personnage:__**

                            Nom : **${all[0].nom}** 
                            Prenom : **${all[0].prenom}**
                            Age : **${all[0].age} ans**
                            Sexe : **${all[0].sexe === "homme" ? "Homme" || all[0].sexe === "femme" : "Femme"}**`)
                            .setColor("Grey")

                            let rowPerso1Gerer = new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                .setCustomId("modifPerso1")
                                .setLabel("Modifier le personnage")
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji("🔁")
                            )
                            let rowPerso1GererDelete = new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                .setCustomId("deletePerso1")
                                .setLabel("Supprimer le personnage")
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji("🗑️")
                            )

                            i.update({embeds: [embedPerso1Gerer], components: [rowPerso1Gerer, rowPerso1GererDelete]})

                        } else if(i.customId === "deletePerso1") {

                            let embedPerso1GererDeleteConfirm = new EmbedBuilder()
                            .setTitle("Confirmer la suppréssions du personnage.")
                            
                            .setDescription(`Êtes vous sur de vouloir supprimer votre **personnage n°1** ?`)
                            .setColor("Red")

                            let rowPerso1GererRetoursDelete = new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                .setCustomId("retoursDeletePerso1")
                                .setLabel("Revenirs en arrière")
                                .setStyle(ButtonStyle.Success)
                                .setEmoji("🔁")
                            )
                            let rowPerso1GererDeleteConfirm = new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                .setCustomId("deletePerso1Confirm")
                                .setLabel("Cofirmer la supprésions du personnage.")
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji("🗑️")
                            )

                            i.update({embeds: [embedPerso1GererDeleteConfirm], components: [rowPerso1GererRetoursDelete, rowPerso1GererDeleteConfirm]})

                        } else if(i.customId === "retoursDeletePerso1") {

                            let embedPerso1Gerer = new EmbedBuilder()
                            .setTitle("Gérer mon personnage n°1")
                            .setThumbnail(`https://minotar.net/avatar/${req[0].playerUserName}/100`)
                            .setDescription(`Liée sur le compte de \`${req[0].playerUUID}\`, soit \`${req[0].playerUserName}\`, commme pseudo détecter à la dernière connexion.\n
                            **__Personnage:__**

                            Nom : **${all[0].nom}** 
                            Prenom : **${all[0].prenom}**
                            Age : **${all[0].age} ans**
                            Sexe : **${all[0].sexe === "homme" ? "Homme" || all[0].sexe === "femme" : "Femme"}**`)
                            .setColor("Grey")

                            let rowPerso1Gerer = new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                .setCustomId("modifPerso1")
                                .setLabel("Modifier le personnage")
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji("🔁")
                            )
                            let rowPerso1GererDelete = new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                .setCustomId("deletePerso1")
                                .setLabel("Supprimer le personnage")
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji("🗑️")
                            )

                            i.update({embeds: [embedPerso1Gerer], components: [rowPerso1Gerer, rowPerso1GererDelete]})

                        } else if(i.customId === 'deletePerso1Confirm') {

                            let embedPerso1GererDeleteConfirm = new EmbedBuilder()
                            .setTitle("Supprésions du personnage.")
                            .setDescription(`Votre personnage à bien été supprimer.`)
                            .setColor("Red")

                            i.update({embeds: [embedPerso1GererDeleteConfirm], components: []})

                            conn.query(`DELETE FROM personnage1 WHERE playerUUID = '${req[0].playerUUID}'`)

                        } else if(i.customId === 'modifPerso1') {

                            const modalModif = new ModalBuilder()
                            .setCustomId("persomodalModif")
                            .setTitle("Modifier le personnage n°1")

                            const nomM = new TextInputBuilder()
                            .setCustomId("nom_perso1M")
                            .setPlaceholder(all[0].nom)
                            .setMaxLength(25)
                            .setLabel("Nouveau nom de votre personnage")
                            .setRequired(false)
                            .setStyle(TextInputStyle.Short)

                            const prenomM = new TextInputBuilder()
                            .setCustomId("prenom_perso1M")
                            .setRequired(false)
                            .setMaxLength(25)
                            .setLabel("Nouveau Prenom de votre personnage")
                            .setPlaceholder(all[0].prenom)
                            .setStyle(TextInputStyle.Short)

                            const ageM = new TextInputBuilder()
                            .setCustomId("age_perso1M")
                            .setRequired(false)
                            .setLabel("Nouvel Age de votre personnage")
                            .setPlaceholder(all[0].age + " (20 - 99)")
                            .setStyle(TextInputStyle.Short)

                            const nomModif = new ActionRowBuilder().addComponents(nomM);
                            const prenomModif = new ActionRowBuilder().addComponents(prenomM);
                            const ageModif = new ActionRowBuilder().addComponents(ageM);
                            
                            modalModif.addComponents(nomModif, prenomModif, ageModif);
                            await i.showModal(modalModif);

                            // Modif

                            client.on(Events.InteractionCreate, async int => {
                                if (!int.isModalSubmit()) return;
                                if (int.customId === 'persomodalModif') {
                                    try {
            
                                        try {
                                            if(int.fields.getTextInputValue("age_perso1M") !== "") {
                                                if(isNaN(int.fields.getTextInputValue('age_perso1M')) || int.fields.getTextInputValue('age_perso1M') > 99 || int.fields.getTextInputValue('age_perso1M') < 20 ) {
                                                    try {
                                                        i.deleteReply();
                                                    } catch (error) {}
                                                    int.reply({ content: "**Erreur:** Vous devez rentrez un chiffre pour l'age, ou le avoir un âge entre **20** et **99** ans !", ephemeral: true })
                                                    return;
                                                }
                                            }
                                            
                                        } catch (error) {
                                            console.log(error)
                                            
                                        }
                                        
                                        let EmbedOk = new EmbedBuilder()
                                        .setColor("Green")
                                        .setTitle('Changement du personnage n°1')
                                        .addFields(
                                            { name: "Nom :", value: `\`${int.fields.getTextInputValue("nom_perso1M") ? int.fields.getTextInputValue("nom_perso1M") + `\` (Anciennement: \`${all[0].nom}\`)` : "Aucun changement\`"}`},
                                            { name: "Prenom :", value: `\`${int.fields.getTextInputValue("prenom_perso1M") ? int.fields.getTextInputValue("prenom_perso1M") + `\` (Anciennement: \`${all[0].prenom})\`` : "Aucun changement\`"}`},
                                            { name: "Âge :", value: `\`${int.fields.getTextInputValue("age_perso1M") ? int.fields.getTextInputValue("age_perso1M") + ` ans \`(Anciennement: \`${all[0].age} ans\`)` : "Aucun changement\`"}  `},
                                        )
                                        try {
                                            i.deleteReply();
                                        } catch (error) {}
                                        int.reply({ embeds: [EmbedOk], components: [], ephemeral: true })

                                        let nom;
                                        let prenom;
                                        let age;
                                        
                                        if (int.fields.getTextInputValue("nom_perso1M") !== "") {
                                            nom = int.fields.getTextInputValue("nom_perso1M");
                                        } else {
                                            nom = all[0].nom;
                                        }
                                        if (int.fields.getTextInputValue("prenom_perso1M") !== "") {
                                            prenom = int.fields.getTextInputValue("prenom_perso1M");
                                        } else {
                                            prenom = all[0].prenom;
                                        }
                                        if (int.fields.getTextInputValue("age_perso1M") !== "") {
                                            age = int.fields.getTextInputValue("age_perso1M");
                                        } else {
                                            age = all[0].age;
                                        }


                                        conn.query(`UPDATE personnage1 SET nom = '${nom}', prenom = '${prenom}', age = '${age}' WHERE playerUUID = '${req[0].playerUUID}'`);
                                        
                                    
                                        
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }
                            });
                            //// Modif s

                        } else if(i.customId === 'perso1create') {

                            const select_sexe = new StringSelectMenuBuilder()
                            .setCustomId("sexe")
                            .setPlaceholder("Choisis ton sexe")
                            
                            .addOptions(
                                new StringSelectMenuOptionBuilder()
                                .setLabel("Homme")
                                .setDescription("Je suis un homme")
                                .setValue("homme"),
                                new StringSelectMenuOptionBuilder()
                                .setLabel("Femme")
                                .setDescription("Je suis une femme")
                                .setValue("femme"),
                            )

                            let row_sexe = new ActionRowBuilder()
                            .addComponents(select_sexe);

                            i.update({embeds: [new EmbedBuilder().setDescription("Creer mon premier personnage")], components: [row_sexe]})
                        }  else if(i.customId === "sexe") {
                            const modal = new ModalBuilder()
                            .setCustomId("persomodal")
                            .setTitle("Créer ton personnage")

                            const nom = new TextInputBuilder()
                            .setCustomId("nom_perso1")
                            .setLabel("Quel est le nom de ton personnage ?")
                            .setStyle(TextInputStyle.Short)

                            const prenom = new TextInputBuilder()
                            .setCustomId("prenom_perso1")
                            .setLabel("Quel est le prenom de ton personnage ?")
                            .setStyle(TextInputStyle.Short)

                            const age = new TextInputBuilder()
                            .setCustomId("age_perso1")
                            .setLabel("Quel age à votre personnage ?")
                            .setPlaceholder("20 - 99")
                            .setStyle(TextInputStyle.Short)

                            const nomBuilder = new ActionRowBuilder().addComponents(nom);
                            const prenomBuilder = new ActionRowBuilder().addComponents(prenom);
                            const ageBuilder = new ActionRowBuilder().addComponents(age);
                            
                            modal.addComponents(nomBuilder, prenomBuilder, ageBuilder);
                            await i.showModal(modal);
                            
                            
                            client.on(Events.InteractionCreate, async int => {
                                if (!int.isModalSubmit()) return;
                                if (int.customId === 'persomodal') {
                                    try {
            
                                        if(isNaN(int.fields.getTextInputValue('age_perso1')) || int.fields.getTextInputValue('age_perso1') > 99 || int.fields.getTextInputValue('age_perso1') < 20 ) {
                                            try {
                                                i.deleteReply();
                                            } catch (error) {}
                                            int.reply({ content: "**Erreur:** Vous devez rentrez un chiffre pour l'age, ou le avoir un âge entre **20** et **99** ans !", ephemeral: true })
                                        } else {
                                            let EmbedOk = new EmbedBuilder()
                                            .setColor("Blue")
                                            .setTitle('Création du 1er personnage')
                                            .addFields(
                                                { name: "Nom :", value: `\`${int.fields.getTextInputValue("nom_perso1")}\``},
                                                { name: "Prenom :", value: `\`${int.fields.getTextInputValue("prenom_perso1")}\``},
                                                { name: "Âge :", value: `\`${int.fields.getTextInputValue("age_perso1")}\` ans`},
                                                { name: "Sexe :", value: `\`${i.customId === "homme" ? "Femme" || i.customId === "femme" : "Homme"}\``},
                                            )
                                            .setThumbnail(int.user.displayAvatarURL())
                                            .setTimestamp()
                                            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                                            try {
                                                i.deleteReply();
                                            } catch (error) {}
                                            int.reply({ embeds: [EmbedOk], ephemeral: true })

                                            conn.query(`
                                                INSERT INTO personnage1 
                                                (nom, prenom, age,sexe,playerUUID, playerDiscordId) VALUES (
                                                    '${int.fields.getTextInputValue('nom_perso1')}',
                                                    '${int.fields.getTextInputValue('prenom_perso1')}',
                                                    '${int.fields.getTextInputValue('age_perso1')}',
                                                    '${i.customId === "homme" ? "femme" || i .customId === "femme" : "homme"}',
                                                    '${req[0].playerUUID}',
                                                    '${req[0].discordID}'
                                                )
                                            `);
                                            
                                        }
                                        
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }
                            });
                        }

                    })
                })
            };
        });     
    }
}