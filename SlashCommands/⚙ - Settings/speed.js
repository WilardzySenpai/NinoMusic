const { MessageEmbed, Message } = require("discord.js");
const ee = require("../../config.json");
const FiltersSettings = require("../../filters.json");

module.exports = {
  name: "speed",
  description: "Changes the Speed of the Song!",
  options: [
    {
      name: "speed_amount",
      description: "What Speed amount should it have?",
      type: 'STRING',
      required: true,
      choices: [
        {
          name: '0.25',
          value: '0.25'
        },
        {
          name: '0.50',
          value: '0.5'
        },
        {
          name: '0.75',
          value: '0.75'
        },
        {
          name: '1',
          value: '1'
        },
        {
          name: '1.25',
          value: '1.25'
        },
        {
          name: '1.50',
          value: '1.5'
        },
        {
          name: '1.75',
          value: '1.75'
        },
        {
          name: '2',
          value: '2'
        }
      ]
    },
  ],
  run: async (client, interaction) => {
    try {
      const {
        member,
        channelId,
        guildId,
        applicationId,
        commandName,
        deferred,
        replied,
        ephemeral,
        options,
        id,
        createdTimestamp
      } = interaction;
      const { guild } = member;
      const { channel } = member.voice;
      try {
        let newQueue = client.distube.getQueue(guildId);
        if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return interaction.followUp({
          embeds: [
            new MessageEmbed().setColor(ee.color).setDescription(`**I am nothing Playing right now!**`)
          ],
          ephemeral: true
        })
        let speed_amount = options.getString("speed_amount")

        FiltersSettings.customspeed = `atempo=${speed_amount}`;
        client.distube.filters = FiltersSettings;
        //add old filters so that they get removed 	
        //if it was enabled before then add it
        if (newQueue.filters.includes("customspeed")) {
          await newQueue.setFilter(["customspeed"]);
        }
        await newQueue.setFilter(["customspeed"]);
        interaction.followUp({
          embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setTimestamp()
            .setTitle(`♨️ **Set the Speed to ${speed_amount}!**`)
            .setFooter({ text: `💢 Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true })})]
        })
      } catch (e) {
        console.log(e.stack ? e.stack : e)
        interaction.followUp({
          content: `Error: `,
          embeds: [
            new MessageEmbed().setColor(ee.wrongcolor)
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