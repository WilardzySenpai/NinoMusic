const { MessageEmbed } = require("discord.js");
const ee = require("../../config.json");

module.exports = {
  name: "setdj",
  description: "Manages the Djs!",
  options: [
    {
      name: "what_to_do",
      description: "What do you want to do?",
      type: 'STRING',
      required: true,
      choices: [
        {
          name: 'Add DJ-Role',
          value: 'add'
        },
        {
          name: 'Remove DJ-Role',
          value: 'remove'
        }
      ]
    },
    {
      name: "which_role",
      description: "Which Role do you want to add/Remove",
      type: 'ROLE',
      required: true
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
      const {
        guild
      } = member;
      let add_remove = options.getString("what_to_do");
      let Role = options.getRole("which_role");
      client.settings.ensure(guild.id, {
        djroles: []
      });
      if (add_remove == "add") {
        if (client.settings.get(guild.id, "djroles").includes(Role.id)) {
          return interaction.followUp({
            ephemeral: true,
            embeds: [
              new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: "NinoMusic", iconURL: "https://cdn.discordapp.com/icons/982068853783789598/9ddbdec90aadbb356547c1ed39d3381d.png" })
                .setDescription(`❌ | This Role is already a DJ-Role!`)
            ],
          })
        }
        client.settings.push(guild.id, Role.id, "djroles");
        var djs = client.settings.get(guild.id, `djroles`).map(r => `<@&${r}>`);
        if (djs.length == 0) djs = "`not setup`";
        else djs.join(", ");
        return interaction.followUp({
          ephemeral: true,
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setFooter({ text: "NinoMusic", iconURL: "https://cdn.discordapp.com/icons/982068853783789598/9ddbdec90aadbb356547c1ed39d3381d.png" })
              .setDescription(`✅ | The Role \`${Role.name}\` got added to the ${client.settings.get(guild.id, "djroles").length - 0} DJ-Roles!`)
              .addField(`🎧 **DJ-Role${client.settings.get(guild.id, "djroles").length > 0 ? "s" : ""}:**`, `>>> ${djs}`, true)
          ],
        })
      } else {
        if (!client.settings.get(guild.id, "djroles").includes(Role.id)) {
          return interaction.followUp({
            ephemeral: true,
            embeds: [
              new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: "NinoMusic", iconURL: "https://cdn.discordapp.com/icons/982068853783789598/9ddbdec90aadbb356547c1ed39d3381d.png" })
                .setDescription(`❌ | This Role is not a DJ-Role yet!`)
            ],
          })
        }
        client.settings.remove(guild.id, Role.id, "djroles");
        var djs = client.settings.get(guild.id, `djroles`).map(r => `<@&${r}>`);
        if (djs.length == 0) djs = "`not setup`";
        else djs.join(", ");
        return interaction.followUp({
          ephemeral: true,
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setFooter({ text: "NinoMusic", iconURL: "https://cdn.discordapp.com/icons/982068853783789598/9ddbdec90aadbb356547c1ed39d3381d.png" })
              .setDescription(`✅ | The Role \`${Role.name}\` got removed from the ${client.settings.get(guild.id, "djroles").length} DJ-Roles!`)
              .addField(`🎧 **DJ-Role${client.settings.get(guild.id, "djroles").length > 0 ? "s" : ""}:**`, `>>> ${djs}`, true)
          ],
        })
      }

    } catch (e) {
      console.log(e.stack)
    }
  }
}