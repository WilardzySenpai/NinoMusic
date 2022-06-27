const { MessageEmbed } = require('discord.js');
const ee = require('../../config.json');
const { check_if_dj } = require("../../util/functions");

module.exports = {
  name: 'loop',
  description: 'Loop the current song.',
  usage: 'loop',
  options: [
    {
      name: 'kinds',
      description: 'Repeat mode',
      type: 'STRING',
      required: true,
      choices: [
        {
          name: 'Off',
          value: 'off'
        },
        {
          name: 'The song',
          value: 'song'
        },
        {
          name: 'List',
          value: 'queue'
        }
      ]
    }
  ],

  run: async (client, interaction, args) => {
    const { member } = interaction;
    const loop = interaction.options.getString('kinds');
    const queue = client.distube.getQueue(interaction);
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) return interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`🚫 | You need to join a voice channel to use this feature.`)
      ]
    });
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

    if (!queue) {
      return interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setAuthor({ name: 'Error', iconURL: `${client.user.displayAvatarURL()}` })
            .setDescription('No songs are playing!')
        ]
      })
    }

    if (loop == 'off') {
      queue.setRepeatMode(0);
      interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setAuthor({ name: 'Off repeat', iconURL: `${client.user.displayAvatarURL()}` })
            .setDescription('Repeat turned off!')
            .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({dynamic: true}) })
        ]
      })
    } else if (loop == 'song') {
      queue.setRepeatMode(1);
      interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setAuthor({ name: 'Repeat the song', iconURL: `${client.user.displayAvatarURL()}` })
            .setDescription('Repeated current song!')
            .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({dynamic: true}) })
        ]
      })
    } else if (loop == 'queue') {
      queue.setRepeatMode(2);
      interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setAuthor({ name: 'Repeat the song', iconURL: `${client.user.displayAvatarURL()}` })
            .setDescription('Repeated playlist!')
            .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({dynamic: true}) })
        ]
      })
    }
  }
}
