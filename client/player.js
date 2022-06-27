const { DisTube } = require('distube');
const client = require("../index.js");
const { MessageEmbed } = require('discord.js');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { cookie } = require('../config.json');
const Format = Intl.NumberFormat();
const config = require('../config.json');
const ee = require('../config.json');
const filters = require(`../filters.json`);

let spotifyoptions = {
  parallel: true,
  emitEventsAfterFetching: false
};

client.distube = new DisTube(client, {
  leaveOnEmpty: false,
  leaveOnFinish: false,
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: true,
  youtubeCookie: `${cookie}`,
  youtubeDL: false,
  customFilters: filters,
  plugins: [
    new SpotifyPlugin(spotifyoptions),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})
if (config.spotifyapi.enabled) {
  spotifyoptions.api = {
    clientId: config.spotifyapi.clientId,
    clientSecret: config.spotifyapi.clientSecret,
  }
}


const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Repeat: \`${
  queue.repeatMode ? (queue.repeatMode === 2 ? 'Playlists' : 'The song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

client.distube.on('addSong', (queue, song) =>
  queue.textChannel.send({
    embeds: [
      new MessageEmbed()
        .setColor(ee.color)
        .setAuthor({ name: 'Added...', iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`[${song.name}](${song.url})`)
        .setThumbnail(song.thumbnail)
        .addField("❤ | Status", `
      ┕${status(queue).toString()}`, false)
        .addField('👀 | Listens', `
        ┕${Format.format(song.views)}`, true)
        .addField('👍 | Prefer', `
        ┕${Format.format(song.likes)}`, true)
        .addField('👎 | Do not like', `
        ┕${Format.format(song.dislikes)}`, true)
        .addField('⌛ | Time', `
        ┕${song.formattedDuration}`, true)
        .addField("👌 | Request by", `
        ┕${song.user}`, true)
    ]
  })
)

client.distube.on('addList', (queue, playlist) =>
  queue.textChannel.send({
    embeds: [
      new MessageEmbed()
        .setColor(ee.color)
        .setAuthor({ name: 'Added...', iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`Added [${playlist.name}](${playlist.url}) (${playlist.songs.length} songs) to the playlist`)
        .setThumbnail(playlist.thumbnail)
        .addField("❤ | Status", `
        ┕${status(queue).toString()}`, false)
        .addField('⌛ | Time', `
        ┕${playlist.formattedDuration}`, true)
        .addField("👌 | Request by", `
        ┕${playlist.user}`, true)
    ]
  })
)

client.distube.on('playSong', (queue, song) =>
  queue.textChannel.send({
    embeds: [
      new MessageEmbed()
        .setColor(ee.color)
        .setAuthor({ name: 'Now playing...', iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`[${song.name}](${song.url})`)
        .setThumbnail(song.thumbnail)
        .setColor(ee.color)
        .setAuthor({ name: 'Now playing...', iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`[${song.name}](${song.url})`)
        .setThumbnail(song.thumbnail)
        .addField("❤ | Status", `
        ┕${status(queue).toString()}`, false)
        .addField('🆙 | Posted by', `
        ┕[${song.uploader.name}](${song.uploader.url})`, true)
        .addField('👀 | Listens', `
        ┕${Format.format(song.views)}`, true)
        .addField('👍 | Prefer', `
        ┕${Format.format(song.likes)}`, true)
        .addField('⌛ | Time', `
        ┕${song.formattedDuration}`, true)
        .addField('📩 | Download link', `
        ┕[Click here](${song.streamURL})`, true)
        .addField("👌 | Request by", `
        ┕${song.user}`, true)
        .addField('📻 | Play music a', `
        ┕🔊 | ${client.channels.cache.get(queue.voiceChannel.id)}
        ┕🪄 | ${queue.voiceChannel.bitrate / 1000}  kbps`, false)
        .addField("🤖 | Propose", `[${song.related[0].name}](${song.related[0].url})
        ┕⌛ | Time: ${song.related[0].formattedDuration} | 🆙 | Posted by: [${song.related[0].uploader.name}](${song.related[0].uploader.url})`, false)
    ]
  })
)
  .on('error', (channel, e) => {
    channel.send(`| An error encountered: I'm missing permission`)
    console.error(e)
  })
  .on('empty', channel => channel.send({
    embeds: [
      new MessageEmbed()
        .setColor(ee.color)
        .setAuthor({ name: 'It`s over...', iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription('')
    ]
  }))
  .on('searchNoResult', (message, query) =>
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor(ee.color)
          .setAuthor({ name: 'Not found...', iconURL: `${client.user.displayAvatarURL()}` })
          .setDescription(`No song found with keyword \`${query}\``)
      ]
    })
  )
  .on('finish', queue => queue.textChannel.send({
    embeds: [
      new MessageEmbed()
        .setColor(ee.color)
        .setAuthor({ name: 'It`s over...', iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription('End of songs in the list')
    ]
  }))

