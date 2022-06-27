const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed, version } = require('discord.js');
const ee = require('../../config.json');

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.followUp({ embeds: [
          new MessageEmbed()
    .addFields(
        {
          name: ":robot: Client",
          value: `┕🟢 Online! <t:${parseInt(client.readyTimestamp /1000)}:R>`,
          inline: true,
        },
        {
          name: "⌛ Ping",
          value: `┕${client.ws.ping}ms!`,
          inline: true,
        },
       {
            name: ":file_cabinet: Memory",
            value: `┕${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
              2
            )}mb`,
            inline: true,
          },
          {
            name: ":robot: Version",
            value: `┕v${require("../../package.json").version}`,
            inline: true,
          },
          {
            name: ":blue_book: Discord.js",
            value: `┕v${version}`,
            inline: true,
          },
          {
            name: ":green_book: Node",
            value: `┕${process.version}`,
            inline: true,
          },
      )
      .setColor(ee.color)
        ]});
    },
};
