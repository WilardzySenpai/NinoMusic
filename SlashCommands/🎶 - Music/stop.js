const { MessageEmbed } = require('discord.js');
const ee = require('../../config.json');
const { check_if_dj } = require("../../util/functions")

module.exports = {
  name: 'stop',
  description: 'Stop the current song and leave the voice channel.',
  aliases: ['leave', 'disconnect', 'dc'],
  usage: '',
  cooldown: 0,
  run: async (client, interaction, args) => {
    try {
      const { member } = interaction;
      const { guild } = member;
      const { channel } = member.voice;
      if (!channel) return interaction.followUp({
        embeds: [
          new MessageEmbed().setColor(ee.color).setDescription(`❌ | Please join ${guild.me.voice.channel ? "my" : "a"} VoiceChannel First!`)
        ],
      })
      try {
        const queue = client.distube.getQueue(interaction)
        const nomusic = new MessageEmbed()
          .setDescription(`❌ | There is no music currently playing!`)
          .setColor(ee.color)
          if (!queue || !queue.songs || queue.songs.length == 0) return interaction.followUp({ embeds: [nomusic] }).catch(e => { })
        if (
          interaction.guild.me.voice.channel &&
          !interaction.guild.me.voice.channel.equals(
            interaction.member.voice.channel
          )
        ) {
          const sameEmbed = new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`❌ | You must be in the same voice channel as the <@${client.user.id}> to use this command!`);
          return interaction.followUp({ embeds: [sameEmbed] });
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
        queue.stop();
        interaction.followUp({
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setAuthor({ name: 'Stop the Queue', iconURL: `${client.user.displayAvatarURL()}` })
              .setDescription('✅ | The has been Stop and Clear!')
              .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({dynamic: true}) })
          ]
        });
      } catch (e) {
        console.log(e.stack)
      }
    } catch (e) {
      console.log(e.stack)
    }
  }
}