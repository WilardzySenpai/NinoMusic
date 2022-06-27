const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed } = require('discord.js');
const ee = require('../../config.json');

module.exports = {
    name: "avatar",
    description: "Embeds the target member's avatar.",
    options:[
        {
            name: "target",
            description: "Select a target.",
            type: "USER",
            required: true,
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      const Target = interaction.options.getUser('target');
        interaction.followUp({embeds: [
          new MessageEmbed()
          .setAuthor(`${Target.username}'s Avatar`, `${Target.displayAvatarURL({dynamic: true, size: 512})}`)
          .setImage(`${Target.displayAvatarURL({dynamic: true, size: 1024})}`)
          .addField("⬇ PNG",`[\`LINK\`](${Target.displayAvatarURL({format: "png"})})`, true)
          .addField("⬇ JPG",`[\`LINK\`](${Target.displayAvatarURL({format: "jpg"})})`, true)
          .addField("⬇ WEBP",`[\`LINK\`](${Target.displayAvatarURL({format: "webp"})})`, true)
          .setColor(ee.color)
        ]});
    },
};
