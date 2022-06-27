const { MessageEmbed, Message } = require("discord.js");
const ee = require("../../config.json");
const { check_if_dj } = require("../../util/functions");

module.exports = {
  name: "shuffle",
  description: "Shuffles (Mixes) The Queue",
  run: async (client, interaction) => {
    try {
      const { member, guildId } = interaction;
      const { guild } = member;
      const { channel } = member.voice;
      if (!channel) return interaction.followUp({
        embeds: [
          new MessageEmbed().setColor(ee.color).setDescription(`❌ |  **Please join ${guild.me.voice.channel ? "__my__" : "a"} VoiceChannel before using this command!**`)
        ],
        ephemeral: true
      })
      try {
        let queue = client.distube.getQueue(guildId);
        if (!queue || !queue.songs || queue.songs.length == 0) return interaction.followUp({
          embeds: [
            new MessageEmbed().setColor(ee.color).setDescription(`❌ | There is no music currently playing!`)
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
        client.maps.set(`beforeshuffle-${queue.id}`, queue.songs.map(track => track).slice(1));
        await queue.shuffle();
        interaction.followUp({
          embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setTimestamp()
            .setDescription(`🔀 **Suffled ${queue.songs.length} Songs!**`)
            .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({dynamic: true}) })]
        })
      } catch (e) {
        console.log(e.stack ? e.stack : e)
        interaction.editReply({
          content: `❌ | Error: `,
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