const { MessageEmbed } = require('discord.js');
const ee = require('../../config.json');
const Topgg = require('@top-gg/sdk')
const topgg = new Topgg.Api(process.env.TOPGG)
const { check_if_dj } = require("../../util/functions")

module.exports = {
  name: 'autoplay',
  description: 'Toggles autoplay for the current guild.',
  usage: 'autoplay',
  run: async (client, interaction, args) => {
    try {
      const { member, guildId } = interaction
      const { guild } = member;
      const { channel } = member.voice;
      const queue = client.distube.getQueue(guildId);
      if (!channel) return interaction.followUp({
        embeds: [
          new MessageEmbed().setColor(ee.color).setDescription(`❌ | Please join ${guild.me.voice.channel ? "my" : "a"} VoiceChannel First!`)
        ],
      })
      try {
        let voted = await topgg.hasVoted(interaction.user.id)
        const nomusic = new MessageEmbed()
          .setDescription(`❌ | There is no music currently playing!`)
          .setColor(ee.color)
        if (!queue || !queue.songs || queue.songs.length == 0) return interaction.followUp({ embeds: [nomusic] }).catch(e => { })
        if (!voted) {
          return interaction.followUp({ content: "You haven't vote to me yet! Vote here: https://top.gg/bot/975028020198928404/vote" })
        } else if (
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

        const autoplay = queue.toggleAutoplay();
        interaction.followUp({
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setAuthor({ name: 'Auto play song', iconURL: `${client.user.displayAvatarURL()}` })
              .setDescription(`Auto play song: ${autoplay ? '**On**' : '**Off**'}`)
              .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
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