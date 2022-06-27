const { Client, CommandInteraction, MessageActionRow, MessageEmbed, MessageButton } = require("discord.js");
const ee = require('../../config.json');

module.exports = {
    name: "invite",
    description: "Information about Nino",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

      const row = new MessageActionRow()
       .addComponents(
    new MessageButton()
    .setLabel("Invite")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2184563009&scope=applications.commands%20bot`)
    .setEmoji("982760548041125898"),
    new MessageButton()
    .setLabel("Support")
    .setStyle("LINK")
    .setURL("https://discord.gg/DhszDJGp7g")
    .setEmoji("982760524863385701"),
    new MessageButton()
    .setLabel("Vote")
    .setStyle("LINK")
    .setURL("https://top.gg/bot/975028020198928404/vote")
    .setEmoji("982120760392949811")
			);
      
          const link_embed = new MessageEmbed()
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(ee.color)
          .setTitle(`Availabe ${client.user.username} Links!`)
          .setDescription(`**All Links Here**\n>>> Support Server [Click here.](https://discord.gg/DhszDJGp7g)\nInvite **${client.user.username}** without SlashCommands [Click here.](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=2184563009&scope=bot)\nInvite **${client.user.username}** with SlashCommands [Click here.](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=2184563009&scope=bot%20applications.commands)`)
          .setFooter({ text: `Hey Thank you for support us!`, iconURL: `${client.user.displayAvatarURL()}`})
      
      interaction.followUp({embeds: [link_embed], components: [row] });
    },
};
