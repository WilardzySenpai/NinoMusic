const { MessageEmbed, Message } = require("discord.js");
const ee = require("../../config.json");
const { check_if_dj } = require("../../util/functions");

module.exports = {
  name: "playskip",
  description: "Plays a Song/Playlist and skips!",
  options: [
    {
      name: "song",
      description: "Which Song do you want to play",
      type: 'STRING',
      required: true
    },
  ],
  run: async (client, interaction) => {
    try {
      const { member, channelId, guildId } = interaction;
      const { guild } = member;
      const { channel } = member.voice;
      const voiceChannel = interaction.member.voice.channel;
      const Text = options.getString("song");
      await interaction.followUp({
        content: `🔍 Searching... ${Text}`,
        ephemeral: true
      });
      try {
        let queue = client.distube.getQueue(guildId)
        let options = {
          member: member,
          skip: true
        }
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
                .setDescription('❌ | No songs are playing at the moment!')
            ]
          })
        }
        if (!queue) options.textChannel = guild.channels.cache.get(channelId)
        await client.distube.play(channel, Text, options)

        interaction.followUp({
          content: `${queue ?.songs ?.length > 0 ? "⏭ Skipping to" : "🎶 Now Playing"}: \`\`\`css\n${Text}\n\`\`\``,
          ephemeral: true
        });
      } catch (e) {
        console.log(e.stack ? e.stack : e)
        interaction.followUp({
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