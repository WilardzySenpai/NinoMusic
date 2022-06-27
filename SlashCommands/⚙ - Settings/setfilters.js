const { MessageEmbed, Message } = require("discord.js");
const ee = require("../../config.json");
const { check_if_dj } = require("../../util/functions");
const FiltersSettings = require("../../filters.json");

module.exports = {
  name: "setfilters",
  description: "Sets (Overwrides) all Filters",
  options: [
    {
      name: "filters",
      description: "Add all filters with a space between, to set!",
      type: 'STRING',
      required: true
    },
  ],
  run: async (client, interaction) => {
    try {
      const { member, guildId, options } = interaction;
      try {
        let queue = client.distube.getQueue(guildId);
        if (!queue || !queue.songs || queue.songs.length == 0) return interaction.followUp({
          embeds: [
            new MessageEmbed().setColor(ee.color).setDescription(`❌ | There is nothing playing right now.`)
          ],
          ephemeral: true
        })
        if (check_if_dj(client, member, queue.songs[0])) {
          return interaction.followUp({
            embeds: [new MessageEmbed()
              .setColor(ee.color)
              .setFooter({ text: "NinoMusic", iconURL: "https://cdn.discordapp.com/icons/982068853783789598/9ddbdec90aadbb356547c1ed39d3381d.png" })
              .setDescription(`❌ | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
            ],
            ephemeral: true
          });
        }
        let filters = options.getString("filters").toLowerCase().split(" ");
        if (!filters) filters = [options.getString("filters").toLowerCase()]
        if (filters.some(a => !FiltersSettings[a])) {
          return interaction.followUp({
            embeds: [
              new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: "NinoMusic", iconURL: "https://cdn.discordapp.com/icons/982068853783789598/9ddbdec90aadbb356547c1ed39d3381d.png" })
                .setTitle(`❌ | You added at least one Filter, which is invalid!`)
                .setDescription("To define Multiple Filters add a **SPACE** (` `) in between!")
                .addField("All Valid Filters:", Object.keys(FiltersSettings).map(f => `\`${f}\``).join(", ") + "\n\n**Note:**\n> *All filters, starting with custom are having there own Command, please use them to define what custom amount u want!*")
            ],
          })
        }
        let amount = filters.length;
        let toAdded = filters;
        //add old filters so that they get removed 	
        queue.filters.forEach((f) => {
          if (!filters.includes(f)) {
            toAdded.push(f)
          }
        })
        if (!toAdded || toAdded.length == 0) {
          return interaction.followUp({
            embeds: [
              new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: "NinoMusic", iconURL: "https://cdn.discordapp.com/icons/982068853783789598/9ddbdec90aadbb356547c1ed39d3381d.png" })
                .setDescription(`❌ | You did not add a Filter, which is (not) in the Filters yet.`)
                .addField("**All __current__ Filters:**", queue.filters.map(f => `\`${f}\``).join(", "))
            ],
          })
        }
        await queue.setFilter(filters);
        interaction.followUp({
          embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setTimestamp()
            .setDescription(`♨️ | Set ${amount} Filters!`)
            .setFooter({ text: `💢 | Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true })})]
        })
      } catch (e) {
        console.log(e.stack ? e.stack : e)
        interaction.followUp({
          content: `❌ | Error: `,
          embeds: [
            new MessageEmbed().setColor(ee.color)
              .setDescription(`\`\`\`${e}\`\`\``)
          ],
          ephemeral: true
        })
      }
    } catch (e) {
      console.log(e.stack)
    }
  }
}