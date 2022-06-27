// const client = require("../index");
// const ee = require("../config.json");

// client.on("messageCreate", async (message) => {
//     if (
//         message.author.bot ||
//         !message.guild ||
//         !message.content.toLowerCase().startsWith(ee.prefix)
//     )
//         return;

//     const [cmd, ...args] = message.content
//         .slice(ee.prefix.length)
//         .trim()
//         .split(/ +/g);

//     const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

//     if (!command) return;
//     await command.run(client, message, args);
// });
