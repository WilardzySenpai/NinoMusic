const { Client, Collection } = require("discord.js");
const { readdirSync } = require('fs');
const Enmap = require("enmap");
const walkSync = require('./util/walkSync.js');
const path = require('path');
require('dotenv').config()
require("./nino");

const client = new Client({
  shards: "auto",
  intents: 32767,
  ws: { properties: { $browser: "discord.js" } }
  //ws: { properties: { $browser: "Discord iOS" } }
});
module.exports = client;

// Global Variables
// client.commands = new Collection();
client.slashCommands = new Collection();
// client.aliases = new Collection();
client.voiceGenerator = new Collection();
// client.categories = readdirSync("./commands/");
client.maps = new Map();

// slashCommands path
client.slashCommandFiles = walkSync(path.join(__dirname, '/SlashCommands'))

// Loading Database
client.settings = new Enmap({ name: "settings", dataDir: "./databases/settings" });

// Initializing the project
require("./handler")(client);
require("./client/player");

//anticrash
process.on('unhandledRejection', (reason, p) => {
  console.log(' [antiCrash] :: Unhandled Rejection/Catch');
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(' [antiCrash] :: Uncaught Exception/Catch');
  console.log(err, origin);
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
  console.log(err, origin);
});
process.on('multipleResolves', (type, promise, reason) => {
  console.log(' [antiCrash] :: Multiple Resolves');
})

client.login(process.env.TOKEN);