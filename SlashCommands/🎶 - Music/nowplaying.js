const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const ee = require('../../config.json');
const Format = Intl.NumberFormat();
const status = queue =>
`Volume: \`${queue.volume}%\` | Filters: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'Playlist' : 'Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

module.exports = {
    name: "nowplaying",
    description: "Shows the current song playing",
    usage: "nowplaying",
    run: async (client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);

        const song = queue.songs[0];
        const embed = new MessageEmbed()
        .setColor(ee.color)
        .setAuthor({name: 'Now playing...', iconURL: `${client.user.displayAvatarURL()}`})
        .setDescription(`[${song.name}](${song.url})`)
        .setThumbnail(song.thumbnail)
        .addField("❤ | Status", `${status(queue).toString()}`, false)
        .addField('👀 | Listens', `${Format.format(song.views)}`, true)
        .addField('👍 | Prefer', `${Format.format(song.likes)}`, true)
        .addField('⌛ | Played', `${queue.formattedCurrentTime} / ${song.formattedDuration}`, true)
        .addField('📩 | Download link', `[Click here](${song.streamURL})`, true)
        .addField("👌 | Requested by",` ${song.user}`, true)

        const saveButton = new MessageButton();

        saveButton.setLabel('Save Song');
        saveButton.setCustomId('saveTrack');
        saveButton.setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(saveButton);
      
        interaction.followUp({embeds: [embed], components: [row] });
    }
}
