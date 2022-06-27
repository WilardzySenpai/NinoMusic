// const player = require('../../client/player.js');
const ee = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const lyricsfinder = require('lyrics-finder');

module.exports = {
    name: 'lyric',
    description: 'Find a song lyrics for you',
    usage: '<song name>',
    options: [
        {
            name: 'song_name',
            description: 'Song name or url',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction, args) => {
        const string = interaction.options.getString('song_name')
      
      try {
        const lyricembed = new MessageEmbed()
         .setDescription("❌ | Lyrics <song title> The lyrics may be incorrect.")
         .setColor(ee.color)
         .setFooter(`Requested by: ${interaction.author}`)
         .setTimestamp()
        if (!string) return interaction.followUp(lyricembed)
      }  catch (e) {
        interaction.followUp(`An error has occured.\n\`${e}\``)
      }

      const msg = await interaction.followUp("Searching for lyrics...");
      
      try {
        lyrics = await lyricsfinder(string, "");
        if (!lyrics) msg.edit("❌ | Couldn't find any lyrics for that song!");
      } catch (err) {
       console.log(err);
       msg.edit("❌ | Couldn't find any lyrics for that song!");
      }
      let lyricsEmbed = new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`Lyrics`)
        .setDescription(`**"${string}"**\n\n${lyrics}`)
        .setTimestamp();

    if (lyrics.length > 4096) {
      lyricsEmbed.setDescription("❌ | Lyrics too long to display!");
    }
    msg.edit({ content: ' ', embeds: [lyricsEmbed] })
    }
}