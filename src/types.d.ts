import { Collection, CommandInteraction, Message, PermissionResolvable, SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js"
import { Connection } from "mysql"

export interface BotEvent {
    name: string,
    once?: boolean | false,
    async execute: (...args?) => void
}

export interface SlashCommand {
    data: SlashCommandBuilder | any,
    async execute(interaction: CommandInteraction<CacheType>): Promise<InteractionResponse<boolean>>,
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLIENT_ID: string
            TOKEN: string
            MYSQL_HOST: string
            MYSQL_USER: string
            MYSQL_PASSWORD: string
            MYSQL_DATABASE: string
        }
    }
}

declare module "discord.js" {
    export interface Client {
        commands: Collection
        conn: Connection
    }
}