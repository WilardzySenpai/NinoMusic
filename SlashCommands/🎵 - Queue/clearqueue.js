const { MessageEmbed, Message } = require("discord.js");
const ee = require("../../config.json");
const { check_if_dj } = require("../../util/functions");

module.exports = {
  name: "clearqueue",
  description: "Clears the Queue",
  run: async (client, interaction) => {
    try {
      const { member, guildId } = interaction;
      try {
        let queue = client.distube.getQueue(guildId);
        if (!queue || !queue.songs || queue.songs.length == 0) return interaction.followUp({
          embeds: [
            new MessageEmbed().setColor(ee.color).setTitle("Theres nothing playing right now.")
          ],
          ephemeral: true
        })
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
        let amount = queue.songs.length - 2;
        queue.songs = [queue.songs[0]];
        interaction.followUp({
          embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setTimestamp()
            .setDescription(`🗑 | Cleared the Queue and deleted ${amount} Songs!`)
            .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })]
        })
      } catch (e) {
        console.log(e.stack ? e.stack : e)
        interaction.editReply({
          content: `Error: `,
          embeds: [
            new MessageEmbed().setColor(ee.color)
              .setDescription(`\`\`\`${e}\`\`\``)
          ],
          ephemeral: true
        })
      }
    } catch (e) {
      console.log(e.stack)
    }
  }
}
