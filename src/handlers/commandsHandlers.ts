import { Client } from "discord.js";
import { join } from "path";
import fs from 'fs';
var colors = require('colors');

function loadCommands(client: Client): void {

    const commandsArray: any[] = [];

    const commandsFolder = fs.readdirSync(join(__dirname, '../commands'));
    for (const folder of commandsFolder) {
        const commandFiles = fs
            .readdirSync(join(__dirname, `../commands/${folder}`))
            .filter((file) => file.endsWith(".ts") || file.endsWith('.ts'));

        for (const f of commandFiles) {
            const commandFile = require(join(__dirname, `../commands/${folder}/${f}`));

            const properties = { folder, ...commandFile };
            client.commands.set(commandFile.command.data, properties);
            commandsArray.push(commandFile.command.data.toJSON());

            console.info(`\u001b[1;34m[COMMANDS] => ${f} loaded`);
            
            continue;
        }
    }

    client.application.commands.set(commandsArray);
}

export { loadCommands };