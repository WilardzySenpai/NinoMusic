const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")
const ee = require('../../config.json');

module.exports = {
    name: "about",
    description: "Show NinoMusic information",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
      
   const row = new MessageActionRow()
       .addComponents(
    new MessageButton()
    .setLabel("Invite")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2184563009&scope=applications.commands%20bot`)
    .setEmoji("982760548041125898"),
    new MessageButton()
    .setLabel("GitHub")
    .setStyle("LINK")
    .setURL("https://github.com/WilardzySenpai/NinoMusic")
    .setEmoji("982760523009495100"),
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

      const mainPage = new MessageEmbed()
            .setAuthor({ name: 'NinoMusic', iconURL: client.user.displayAvatarURL() })
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(ee.color)
            .addField('Creator', '[はちき#3819](discord.com/users/939867069070065714)', true)
            .addField('Organization', '[Hachiki](https://github.com/wilardzysenpai)', true)
            .addField('Repository', '[Here](https://github.com/WilardzySenpai/NinoMusic)', true)
            .addField('\u200b',
                `[NinoMusic](https://github.com/WilardzySenpai/NinoMusic/) is [Hachiki](discord.com/users/939867069070065714)'s was project by Me Hachiki. I've been using discord.js v12 for a long time and decided to go on v13 cause all of the bot i've seen these days are obliously using now v13 and also Discord announce it *i think*. So this was my first project on v13 is to create this project at first i was unable to creat it but after reading ang watching alot of information about v13 i manage to do this and i was happy to see the result. I also like [Nino](https://5hanayome.fandom.com/wiki/Nino_Nakano) so yea\n\n**More info about Nino**\nNino is a simple music bot on discord that can support Spotify, SoundCloud and YouTube also Nino can play a direct music link, don't you know that? pretty cool isn't. We hope that Nino can bring happiness to your server's and play Music whenever you all in vc, Thank you!\n\n**Commands Contributes**\nRPS - CodyDimension\nRPS Image - Mykeyy\nHelpCommand - Hachiki\nAll slashCommands - also Hachiki`, true)
        await interaction.followUp({embeds: [mainPage], components: [row]});
    }
}