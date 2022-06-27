const { MessageEmbed } = require('discord.js');
const ee = require('../../config.json');
const { check_if_dj } = require("../../util/functions");

module.exports = {
  name: 'seek',
  description: 'Rewind the current song to the specified position!',
  usage: 'seek <time>',
  options: [
    {
      name: 'time',
      description: 'Incoming song rewind time (ms)',
      type: 'NUMBER',
      required: false,
    }
  ],
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
        const time = interaction.options.getNumber('time');
        const queue = client.distube.getQueue(guildId);
        const nomusic = new MessageEmbed()
          .setDescription(`❌ | There is no music currently playing!`)
          .setColor(ee.color)
        if (!queue)
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
        if (!time) return interaction.followUp({
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setAuthor({ name: 'Error', iconURL: `${client.user.displayAvatarURL()}` })
              .setDescription(`You must choose a timeline to rewind! ( < ${queue.songs[0].duration}ms )`)
          ]
        })
        if (time > queue.songs[0].formattedDuration) return interaction.followUp({
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setAuthor({ name: 'Error', iconURL: `${client.user.displayAvatarURL()}` })
              .setDescription('The rewind time can`t be larger than the song time!')
          ]
        })
        queue.seek(time);
        interaction.followUp({
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setAuthor({ name: 'Rewind', iconURL: `${client.user.displayAvatarURL()}` })
              .setDescription(`Rewinded to **${time}ms / ${queue.songs[0].duration}ms**`)
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