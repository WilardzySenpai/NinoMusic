const { MessageEmbed } = require('discord.js');
const ee = require('../../config.json');
const { check_if_dj } = require("../../util/functions");

module.exports = {
  name: 'pause',
  description: 'Pause the current song!',
  usage: 'pause',
  run: async (client, interaction, args) => {
    try {
      const { member, guildId } = interaction;
      const { guild } = member;
      const { channel } = member.voice;
      if (!channel) return interaction.followUp({
        embeds: [
          new MessageEmbed().setColor(ee.color).setDescription(`❌ | Please join ${guild.me.voice.channel ? "my" : "a"} VoiceChannel First!`)
        ],
      })
      try {
        const queue = client.distube.getQueue(guildId)
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
        if (queue.paused) {
          let qpaused = new MessageEmbed()
            .setDescription("❌ | The song/queue are already paused!")
            .setColor(ee.color)
          return interaction.followUp({ embeds: [qpaused] });
        }
        queue.pause();
        interaction.followUp({
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setAuthor({ name: 'Pause', iconURL: `${client.user.displayAvatarURL()}` })
              .setDescription('Song paused!')
              .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({dynamic: true}) })
          ]
        })
      } catch (e) {
        console.log(e.stack)
      }
    } catch (e) {
      console.log(e.stack)
    }
  }
}