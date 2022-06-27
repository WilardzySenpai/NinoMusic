const { MessageEmbed, Permissions } = require("discord.js");
const ee = require('../../config.json');

module.exports = {
  name: "join",
  description: "Makes the bot join the voice channel.",
  run: async (client, interaction, args) => {
    const msg = await interaction.followUp("Processing.....");

    const { channel } = interaction.member.voice;
    if (!interaction.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed: { description: "I don't have perm `CONNECT` or `SPEAK` to execute command!", color: ee.color } });
    if (!interaction.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed : { description: `I don't have perm \`CONNECT\` or \`SPEAK\` in ${channel.name} to join voice!`, color: ee.color } });

    const clientVoice = interaction.guild.me.voice.channel;
    const memberVoice = interaction.member.voice.channel;

    if (clientVoice) {
      if (clientVoice !== memberVoice) {
        const embed = new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`I'm already on your voice channel`);

        return msg.edit({ content: ' ', embeds: [embed] });
      }
    } else {
      if (memberVoice) {
        client.distube.voices.join(memberVoice)
         .then(voice => {
           const embed = new MessageEmbed()
             .setColor(ee.color)
             .setDescription(`\`🔊\` | **Joined:** \`${memberVoice.name}\``)

            msg.edit({ content: ' ', embeds: [embed] });
         })
        .catch(error => {
           console.log(e);
        })
      } else {
        const embed = new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`You must be in a voice channel!`)
          .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({dynamic: true}) })

        return msg.edit({ content: ' ', embeds: [embed] });
      }
    }
  }
}