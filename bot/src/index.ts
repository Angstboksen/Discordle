import "reflect-metadata";
import path from "path";
import { Intents, Interaction } from "discord.js";
import { Client } from "discordx";
import { config } from "dotenv";
import { importx } from "@discordx/importer";
config();

const client = new Client({
  simpleCommand: {
    prefix: "!", // define your prefix here
  },
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ]
});

client.once("ready", async () => {
  await client.initApplicationCommands({
    guild: { log: true },
    global: { log: true },
  });
  await client.initApplicationPermissions();
  console.log("------ Initiation successful! ------")
  console.log("------ Discordle is now online! ------")
});

client.on("interactionCreate", (interaction: Interaction) => {
  client.executeInteraction(interaction);
});

client.on("messageCreate", (message) => {
  client.executeCommand(message);
});

importx(path.join(__dirname, "./Discordle.ts")).then(() => {
  client.login(process.env.BOT_TOKEN ?? "");
});