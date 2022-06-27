const Discord = require('discord.js');
const ee = require('../../config.json');

module.exports = {
  name: 'save',
  description: "It sends and saves the played music to you via dm box.",
  usage: 'save',
  run: async (client, interaction, args) => {
    const queue = client.distube.getQueue(interaction);

    if (!queue || !queue.playing) return interaction.followUp({ content: `❌ | There is no music currently playing!.`, ephemeral: true }).catch(e => { })

    const song = queue.songs[0];
    const save_embed = new Discord.MessageEmbed()
      .setColor(ee.color)
      .setTitle(client.user.username + " - Save Track")
      .setThumbnail(client.user.displayAvatarURL())
      .addField(`🎶 Track`, `\`${song.name}\``)
      .addField(`⏳ Duration`, `\`${song.formattedDuration}\``, true)
      .addField(`🔗 URL`, `${song.url}`)
      .addField(`㊗ Saved Server`, `\`${interaction.guild.name}\``)
      .addField(`➡ Requested By`, `${song.user}`, true)
      .setTimestamp()
      .setFooter({ text: 'H_M Save Music!', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
    interaction.user.send({ embeds: [save_embed], content: `/play ${song.url} 💞` }).then(() => {
      interaction.followUp({ content: `✅ | I sent the name of the music via private message.`, ephemeral: true }).catch(e => { })
    }).catch(error => {
      interaction.reply({ content: `❌ | Unable to send you private message.`, ephemeral: true }).catch(e => { })
    });
  }
}