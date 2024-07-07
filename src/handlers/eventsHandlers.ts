import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { BotEvent } from "../types";

function loadEvents(client: Client): void {
    const eventsDir = join(__dirname, "../events");

    readdirSync(eventsDir).forEach(file => {
        if (!file.endsWith(".ts")) return;

        const event: BotEvent = require(`${eventsDir}/${file}`).default;

        const execute = (...args) => event.execute(...args, client);

        if (event.once) {
            client.once(event.name, execute);
        } else {
            client.on(event.name, execute);
        }

        console.info(`\u001b[1;32m[EVENTS] => ${event.name} loaded`);
    });
}

export { loadEvents };