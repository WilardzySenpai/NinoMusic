const { MessageEmbed } = require('discord.js');
const ee = require('../../config.json');
const Topgg = require('@top-gg/sdk')
const topgg = new Topgg.Api(process.env.TOPGG)
const { check_if_dj } = require("../../util/functions");

module.exports = {
  name: 'volume',
  description: 'Changes the volume of the current song.',
  usage: '<volume>',
  options: [
    {
      name: 'volume',
      description: 'The volume to set the music to.',
      type: 'NUMBER',
      required: true
    }
  ],
  run: async (client, interaction, args) => {
    try {
      const { member, guildId, options } = interaction
      const { guild } = member;
      const { channel } = member.voice;
      if (!channel) return interaction.followUp({
        embeds: [
          new MessageEmbed().setColor(ee.color).setDescription(`❌ | Please join ${guild.me.voice.channel ? "my" : "a"} VoiceChannel before using this command!`)
        ],
      })
      try {
        const queue = client.distube.getQueue(guildId);
        const volume = options.getNumber('volume');
        const nomusic = new MessageEmbed()
          .setDescription(`❌ | There is no music currently playing!`)
          .setColor(ee.color)
        let voted = await topgg.hasVoted(interaction.user.id)
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
        if (!queue || !queue.songs || queue.songs.length == 0) return interaction.followUp({ embeds: [nomusic] }).catch(e => { })
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
        queue.setVolume(volume);
        interaction.followUp({
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setAuthor({ name: 'Change the volume', iconURL: `${client.user.displayAvatarURL()}` })
              .setDescription(`Changed the volume to **${volume}%**`)
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