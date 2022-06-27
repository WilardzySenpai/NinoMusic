const { MessageEmbed } = require('discord.js');
const ee = require('../../config.json');
const { check_if_dj } = require("../../util/functions")

module.exports = {
  name: 'filters',
  description: 'Add filter.',
  usage: 'filter',
  options: [
    {
      name: 'preset',
      description: 'Filters to add.',
      type: 'STRING',
      required: true,
      choices: [
        {
          name: 'BassBoost',
          value: 'bassboost'
        },
        {
          name: 'Nightcore',
          value: 'nightcore'
        },
        {
          name: 'Vaporwave',
          value: 'vaporwave'
        },
        {
          name: '3D',
          value: '3d'
        },
        {
          name: 'Echo',
          value: 'echo'
        },
        {
          name: 'Karaoke',
          value: 'karaoke'
        },
        {
          name: 'Flanger',
          value: 'flanger'
        },
        {
          name: 'Gate',
          value: 'gate'
        },
        {
          name: 'Hass',
          value: 'hass'
        },
        {
          name: 'Reverse',
          value: 'reverse'
        },
        {
          name: 'Surround',
          value: 'surround'
        },
        {
          name: 'Mcompand',
          value: 'mcompand'
        },
        {
          name: 'Phaser',
          value: 'Phaser'
        },
        {
          name: 'Tremolo',
          value: 'tremolo'
        },
        {
          name: 'Earwax',
          value: 'earwax'
        }
      ]
    }
  ],

  run: async (client, interaction, args) => {
    try {
      const { member, guildId, options } = interaction;
      const { guild } = member;
      const { channel } = member.voice;
      if (!channel) return interaction.followUp({
        embeds: [
          new MessageEmbed().setColor(ee.color).setDescription(`❌ | Please join ${guild.me.voice.channel ? "my" : "a"} VoiceChannel First!`)
        ],
      })
      try {
        const queue = client.distube.getQueue(guildId);
        const filterss = options.getString('preset');
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
        if (!interaction.member.voice.channel) {
          const joinEmbed = new MessageEmbed()
            .setColor(ee.color)
            .setDescription("❌ | You must be in a voice channel to use this command!");
          return interaction.followUp({ embeds: [joinEmbed], ephemeral: true });
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
        queue.filterss = !queue.filterss

        let thing = new MessageEmbed().setColor(ee.color);

        if (filterss == 'nightcore') {
          thing.setDescription(`✅ | Nightcore filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**`);
          client.distube.setFilter(interaction, filterss);
        } else if (filterss == "bassboost") {
          thing.setDescription(`✅ | BassBoost filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**`);
          client.distube.setFilter(interaction, filterss);
        } else if (filterss == "vaporwave") {
          thing.setDescription(`✅ | Vaporwave filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
          client.distube.setFilter(interaction, filterss);
        } else if (filterss == "3d") {
          thing.setDescription(`✅ | 3D filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
          client.distube.setFilter(interaction, filterss);
        } else if (filterss == "echo") {
          thing.setDescription(`✅ | Echo filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
          client.distube.setFilter(interaction, filterss);
        } else if (filterss == "karaoke") {
          thing.setDescription(`✅ | Karaoke filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
          client.distube.setFilter(interaction, filterss);
        } else if (filterss == "flanger") {
          thing.setDescription(`✅ | Flanger filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
          client.distube.setFilter(interaction, filterss);
        } else if (filterss == "gate") {
          thing.setDescription(`✅ | Gate filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
          client.distube.setFilter(interaction, filterss);
        } else if (filterss == "hass") {
          thing.setDescription(`✅ | Hass filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
          client.distube.setFilter(interaction, filterss);
        } else if (filterss == "reverse") {
          thing.setDescription(`✅ | Reverse filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
          client.distube.setFilter(interaction, filterss);
        } else if (filterss == "surround") {
          thing.setDescription(`✅ | Surround filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
          client.distube.setFilter(interaction, filterss);
        } else if (filterss == "mcompand") {
          thing.setDescription(`✅ | Mcompand filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
          client.distube.setFilter(interaction, filterss);
        } else if (filterss == "phaser") {
          thing.setDescription(`✅ | Phaser filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
          client.distube.setFilter(interaction, filterss);
        } else if (filterss == "tremolo") {
          thing.setDescription(`✅ | Tremolo filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
          client.distube.setFilter(interaction, filterss);
        } else if (filterss == "earwax") {
          thing.setDescription(`✅ | Earwax filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
          client.distube.setFilter(interaction, filterss);
        } else {
          thing.setDescription("❌ | Invalid filter!");
        }
        return interaction.followUp({ embeds: [thing], ephemeral: true });
      } catch (e) {
        console.log(e.stack)
      }
    } catch (e) {
      console.log(e.stack)
    }
  }
}
