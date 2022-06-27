const { MessageEmbed } = require('discord.js');
const ee = require('../../config.json');

module.exports = {
  name: 'queue',
  description: 'Display the list of songs in the queue.',
  usage: 'queue',
  run: async (client, interaction, args) => {
    const queue = client.distube.getQueue(interaction);

    if (!queue) {
      return interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription('No songs are playing at the moment!')
        ]
      })
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

    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')

    const tracks = queue.songs
      .map((song, i) => `**${i + 1}** - [${song.name}](${song.url}) | ${song.formattedDuration} Requested by : ${song.user}`)

    const songs = queue.songs.length;
    const nextSongs = songs > 10 ? `And **${songs - 10}** another song...` : `In playlist **${songs}** songs...`;

    interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setColor(ee.color)
          .setAuthor({ name: 'Playlists', iconURL: `${client.user.displayAvatarURL()}` })
          .setDescription(`Now playing ${tracks.slice(0, 10).join('\n')}\n\n${nextSongs}`)
          .addField("__**Now playing:**__", `[${queue.songs[0].name}](${queue.songs[0].url}) - ${queue.songs[0].formattedDuration} | Request by: ${queue.songs[0].user}`, false)
          .addField(`Total play time:`, `${queue.formattedDuration}`, true)
          .addField(`Total number of songs:`, `${songs}`, true)
      ]
    })
  }
}