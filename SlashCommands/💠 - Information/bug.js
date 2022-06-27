const { CommandInteraction, MessageEmbed } = require('discord.js');
const ee = require('../../config.json');

module.exports = {
  name: 'bug',
  description: 'Report a bug from Nino that you saw',
  options: [
    {
      name: 'bug',
      description: 'what bug/problem you saw',
      type: 'STRING',
      required: true
    },
    {
      name: 'text',
      description: 'provide a simple description',
      type: 'STRING',
      required: false
    }
  ],
  run: async (client, interaction) => {
    const { member, options } = interaction;

    const name = options.getString('bug');
    const text = options.getString('text') || 'No Description';

    const suggestion = new MessageEmbed()
      .setColor(ee.color) 
      .setAuthor({ name: `${member.user.tag} reported a bug!`, iconURL: member.displayAvatarURL() })
      .addField("Bug", `
      ┕${name}`, true)
      .addField("Description", `
      ┕${text}`)
    interaction.followUp({ content: "Thanks for submiting a bug!"})
    //990412854979088394
    await client.channels.cache.get('982068853783789602').send({ embeds: [suggestion] })
  }
}