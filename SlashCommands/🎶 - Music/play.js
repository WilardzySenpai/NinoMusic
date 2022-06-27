// const player = require('../../client/player.js');
const ee = require('../../config.json');
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'play',
  description: 'Play a song from YouTube, SoundCloud, & Spotify',
  usage: '<song name>',
  options: [
    {
      name: 'name_song_url',
      description: 'Song name or url',
      type: 'STRING',
      required: true
    }
  ],
  run: async (client, interaction, args) => {
    const string = interaction.options.getString('name_song_url')

    const voiceChannel = interaction.member.voice.channel
    const queue = await client.distube.getQueue(interaction)
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
    //const msg = interaction.followUp("🔍 **Searching and attempting...**");
    await interaction.followUp({ content: "Successfully searched..." }).then(msg =>
      setTimeout(() => msg.delete(), 4000))
      .catch(console.error);
    client.distube.play(voiceChannel, string, {
      textChannel: interaction.channel,
      member: interaction.member
    })
  }
}