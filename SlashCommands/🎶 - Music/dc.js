const { MessageEmbed } = require('discord.js');
const ee = require('../../config.json');

module.exports = {
  name: 'disconnect',
  description: 'Diconnect Nino in a vc',
  usage: '',
  cooldown: 0,
  run: async (client, interaction, args) => {
    try {
      const { member } = interaction;
      const { guild } = member;
      const { channel } = member.voice;
      if (!channel) return interaction.followUp({
        embeds: [
          new MessageEmbed().setColor(ee.color).setDescription(`❌ | Please join ${guild.me.voice.channel ? "my" : "a"} VoiceChannel First!`)
        ],
      })
      try {
        const queue = client.distube.getQueue(interaction)
        const yesmusic = new MessageEmbed()
          .setDescription(`❌ | Someone still using me!`)
          .setColor(ee.color)
        if (queue) return interaction.followUp({ embeds: [yesmusic] }).catch(e => { })
        if (
          interaction.guild.me.voice.channel &&
          !interaction.guild.me.voice.channel.equals(
            interaction.member.voice.channel
          )
        ) {
          const sameEmbed = new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`❌ | You must be in the same voice channel as the <@${client.user.id}> to use this command!`);
          return interaction.followUp({ embeds: [sameEmbed] });
        }
        client.distube.voices.leave(interaction);
        interaction.followUp({
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setAuthor({ name: 'Disconnect', iconURL: `${client.user.displayAvatarURL()}` })
              .setDescription('✅ | Disconnected from voice channel!')
              .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({dynamic: true}) })
          ]
        });
      } catch (e) {
        console.log(e.stack)
      }
    } catch (e) {
      console.log(e.stack)
    }
  }
}