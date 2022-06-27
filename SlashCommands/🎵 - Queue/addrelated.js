const { MessageEmbed, Message } = require("discord.js");
const ee = require("../../config.json");
const { check_if_dj } = require("../../util/functions")
module.exports = {
  name: "addrelated",
  description: "Add a similar/related song to the current Song!",
  run: async (client, interaction) => {
    try {
      const { member } = interaction;
      const voiceChannel = interaction.member.voice.channel;
      let queue = client.distube.getQueue(guildId);
      if (!voiceChannel) return interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`🚫 | You need to join a voice channel to use this feature.`)
        ]
      });
      if (
        interaction.guild.me.voice.channel &&
        !interaction.guild.me.voice.channel.equals(
          interaction.member.voice.channel
        )
      ) {
        const sameEmbed = new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`❌ | You must be in the same voice channel as the <@${client.user.id}> to use this command!`);
        return interaction.followUp({ embeds: [sameEmbed], ephemeral: true });
      }
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
      try {
        if (!queue || !queue.songs || queue.songs.length == 0) return interaction.followUp({
          embeds: [
            new MessageEmbed().setColor(ee.ee).setTitle(`No songs are playing at the moment!`)
          ],
          ephemeral: true
        })
        //update it without a response!
        await interaction.followUp({
          content: `🔍 Searching Related Song for... **${queue.songs[0].name}**`,
          ephemeral: true
        });
        await queue.addRelatedSong();
        await interaction.followUp({
          content: `👍 Added: **${queue.songs[queue.songs.length - 1].name}**`,
          ephemeral: true
        });
      } catch (e) {
        console.log(e.stack ? e.stack : e)
        interaction.followUp({
          content: `${client.allEmojis.x} | Error: `,
          embeds: [
            new MessageEmbed().setColor(ee.ee)
              .setDescription(`\`\`\`${e}\`\`\``)
          ],
          ephemeral: true
        })
      }
    } catch (e) {
      console.log(String(e.stack))
    }
  }
}