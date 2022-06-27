const lyricsfinder = require('lyrics-finder');
const { MessageEmbed } = require('discord.js');
const ee = require('../../config.json');

module.exports = {
  name: "lyrics",
  aliases: [],
  description: "Display lyrics of a song",
  accessableby: "Member",
  category: "music",
  run: async (client, interaction, args) => {
    const msg = await interaction.followUp("Searching for lyrics...");
    const voiceChannel = interaction.member.voice.channel;

    const queue = client.distube.getQueue(interaction);
    if (!queue) msg.edit(`There is nothing in the queue right now!`)
    const { channel } = interaction.member.voice;
    if (!voiceChannel) return interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`🚫 | You need to join a voice channel to use this feature.`)
      ]
    });

    if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

    let song = args.join(" ");
    let CurrentSong = queue.songs[0];
    if (!song && CurrentSong) song = CurrentSong.name;

    let lyrics = null;

    try {
      lyrics = await lyricsfinder(song, "");
      if (!lyrics) msg.edit("❌ | Couldn't find any lyrics for that song!");
    } catch (err) {
      console.log(err);
      msg.edit("❌ | Couldn't find any lyrics for that song!");
    }
    let lyricsEmbed = new MessageEmbed()
      .setColor(ee.color)
      .setTitle(`Lyrics`)
      .setDescription(`**${song}**\n${lyrics}`)
      .setFooter({ text: `Requested by ${CurrentSong.user}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

    if (lyrics.length > 2048) {
      lyricsEmbed.setDescription("❌ | Lyrics too long to display!");
    }
    msg.edit({ content: ' ', embeds: [lyricsEmbed] })
      .then(n => {
        var total = queue.songs[0].duration * 1000;
        var current = queue.currentTime * 1000;
        let time = total - current;
        setTimeout(() => { msg.delete(); }, time);
      })
  }
};
