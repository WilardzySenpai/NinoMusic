const { MessageEmbed } = require("discord.js");
const ee = require('../../config.json');

module.exports = {
        name: "filterlist",
        usage: "(command)",
        description: "Displays all filters that the bot has.",
    run: async (client, interaction, args) => {
      
        const embed = new MessageEmbed()
            .setColor(ee.color)
            .setAuthor({ name: `Filter List`, iconURL: interaction.guild.iconURL({ dynamic: true })})
            .setDescription(`**Nino Available Filters!.**`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .addField('** **', `\`Nighcore\``, true)
            .addField('** **', `\`Bassboost\``, true)
            .addField('** **', `\`Vaporwave\``, true)
            .addField('** **', `\`3D\``, true)
            .addField('** **', `\`Echo\``, true)
            .addField('** **', `\`Karaoke\``, true)
            .addField('** **', `\`Flanger\``, true)
            .addField('** **', `\`Gate\``, true)
            .addField('** **', `\`Haas\``, true)
            .addField('** **', `\`Reverse\``, true)
            .addField('** **', `\`Surround\``, true)
            .addField('** **', `\`Mcompand\``, true)
            .addField('** **', `\`Phaser\``, true)
            .addField('** **', `\`Tremolo\``, true)
            .addField('** **', `\`Earwax\``, true)
            .setFooter({ text: `Example: /filter bassboost`})
            .setTimestamp()

            interaction.followUp({embeds: [embed] });
        }
};