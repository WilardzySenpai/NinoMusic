const { MessageActionRow, MessageButton, MessageEmbed, Client } = require('discord.js')
const ee = require("../../config.json")
const path = require('path')

module.exports = {
  name: 'help',
  description: 'Sends the help embed!',
  usage: "/help <slashCommand>",
  options: [
    {
      name: 'slash-command',
      description: "Get info on a certain slash command",
      type: 'STRING',
      required: false,
    }
  ],
  run: async (client, interaction) => {
    let slashCommand = interaction.options.getString('slash-command')
    let { member } = interaction;
    
    const home = new MessageEmbed()
      .setColor(ee.color)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }) )
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
      .setTitle(`${client.user.username} Help Section`)
      .setDescription(`Hey, ${client.user.username} is here! and here's all my commands available. You can use \`/help <command>\` to see the description of the command.`)
      .setFooter({ text: "You can use this slash command to find more info on specific commands!", iconURL: client.user.displayAvatarURL() })

    client.slashCommands.forEach(slashCommand => {
      const filepath = client.slashCommandFiles.find(filepath => filepath.includes(slashCommand.name))
      if (!filepath) return

      const module = getModuleFromPath(filepath)

      if (module == "developer") return

      var field = home.fields.find(c => c.name === module)

      if (!field) {
        home.addField(module, 'NONE')
        field = home.fields.find(field => field.name == module)
      }

      if (field.value == "NONE") field.value = '`' + slashCommand.name + '`'
      else field.value += `, \`${slashCommand.name}\``
    })

    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=977227823414648832&permissions=8&scope=applications.commands%20bot")
        .setLabel("Invite Link")
        .setEmoji("982760548041125898"),
      new MessageButton()
        .setStyle("LINK")
        .setURL("https://discord.gg/6CGp2yU8")
        .setLabel("Support Server Link")
        .setEmoji("982760524863385701"),
      new MessageButton()
        .setStyle("LINK")
        .setURL("https://top.gg/bot/975028020198928404/vote")
        .setLabel("Vote")
        .setEmoji("982120760392949811")
    )

    if (!slashCommand) {
      interaction.followUp({ embeds: [home], comtent: `${member.tag} it's UPDATE 3!`, components: [button] })
    } else {
      var command = client.slashCommands.get(slashCommand.toLowerCase())

      if (!command) return interaction.followUp(`${client.emotes.error} I could not find a slash command with that name!`)

      const embed = new MessageEmbed()
      embed.setColor(ee.color)
      embed.setTitle(`Slash command Information - ${command.name}`)
      embed.setFooter({ text: "<> means required, and [] means optional", iconURL: client.user.displayAvatarURL() })
      embed.addField("Description: ", `\`\`\`${command.description}\`\`\``)
      if (command.args) embed.addField("Usage: ", `\`\`\`/${command.name} ${command.args}\`\`\``)
      if (command.reqPerm && command.reqPerm != "NONE") embed.addField("Required Permissions: ", `\`\`\`${command.reqPerm}\`\`\``)
      if (command.cooldown) embed.addField('Cooldown: ', `\`\`\`${command.cooldown}\`\`\``)

      interaction.followUp({ embeds: [embed], components: [button] })
    }
  }
}

const getModuleFromPath = (filepath) => {
  const splited = filepath.split(path.sep)
  return splited[splited.length - 2]
}