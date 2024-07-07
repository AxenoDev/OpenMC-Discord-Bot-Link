import EventEmitter from "events";
import { BotEvent } from "../types";
import { ActivityType, Client, Events } from "discord.js";

const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        console.log((`💪 Logged in as ${client.user?.tag}`))

        let statuses = [
            () => `www.wiki.openmc.fr`,
            () => `dev.openmc.fr`
        ]
        
        let i = 0;

        const updateActivity = () => {
            client.user?.setActivity(statuses[i](), { type: ActivityType.Watching });
            i = ++i % statuses.length;
        };

        updateActivity();

        const intervalId = setInterval(updateActivity, 60000);

        client.on('disconnect', () => clearInterval(intervalId));
    },
}

export default event;