const { MessageEmbed } = require("discord.js");
const ee = require('../../config.json');
const { check_if_dj } = require("../../util/functions");

module.exports = {
  name: "previous",
  description: "Plays the previous song in the queue.",
  run: async (client, interaction, args) => {
    const msg = await interaction.followUp("Processing.....");
    const { member } = interaction;
    const queue = client.distube.getQueue(interaction);
    if (!queue) msg.edit(`There is nothing in the queue right now!`)
    const { channel } = interaction.member.voice;
    if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")
    if (check_if_dj(client, member, queue.songs[0])) {
      return interaction.followUp({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setFooter({ text: "NinoMusic", iconURL: "https://cdn.discordapp.com/icons/982068853783789598/9ddbdec90aadbb356547c1ed39d3381d.png" })
          .setDescription(`❌ | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
        ],
        ephemeral: true
      });
    }
    if (queue.previousSongs.length == 0) {
      const embed = new MessageEmbed()
        .setColor(ee.color)
        .setDescription("\`🚨\` | **There are no** `Previous` **songs**")

      msg.edit({ content: ' ', embeds: [embed] });
    } else {
      await client.distube.previous(interaction)
        .then(song => {
          const embed = new MessageEmbed()
            .setColor(ee.color)
            .setDescription("\`⏮\` | **Song has been:** `Previous`")
            .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({dynamic: true}) })

          msg.edit({ content: ' ', embeds: [embed] });
        });
    }
  }
}
