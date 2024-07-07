import * as dotenv from 'dotenv';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { loadCommands } from './handlers/commandsHandlers';
import { loadEvents } from './handlers/eventsHandlers';
import connectDatabase from './handlers/databaseHandlers';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

client.commands = new Collection();

client.conn = connectDatabase();

client.login(process.env.TOKEN).then(() => {
  loadCommands(client);
  loadEvents(client);
}).catch((err) => {
  console.log(err);
});