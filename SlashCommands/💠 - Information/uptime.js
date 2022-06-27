const { MessageEmbed } = require("discord.js");
const ee = require('../../config.json');
const { getDateTimeString } = require('../../util/getDateTimeString')
module.exports = {
        name: "uptime",
        usage: "(command)",
        description: "Shows for how long i\'ve been online",
    run: async (client, interaction, args) => {
        const date = new Date();
        const timestamp = date.getTime() - Math.floor(client.uptime);
      
        const embed = new MessageEmbed()
            .setColor(ee.color)
            .setAuthor({ name: `${client.user.username} Uptime`, iconURL: interaction.guild.iconURL({ dynamic: true })})
            .setDescription(`**Online since** ${getDateTimeString(timestamp).split(" ")[0]} <t:${Math.floor(timestamp / 1000)}:d><t:${Math.floor(timestamp / 1000)}:T>\n**More detailled:** \`\`\`yml\n${getDateTimeString(timestamp)}\n\`\`\``)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setTimestamp()

            interaction.followUp({embeds: [embed] });
        }
};