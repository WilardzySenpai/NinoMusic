const client = require("../index");
const { Client, Guild, MessageEmbed, WebhookClient} = require("discord.js");;
const Discord = require("discord.js");
const ee = require('../config.json');
const wbc = new WebhookClient({
                id: "982054878899748984",//Add Webhook ID
                token:"FuiwcHhrxwioYgsxtBYUfxhOAdg68LdjkAe935Qw9N0xtkK30AS8ehHbQICm6xZHD0un",//Add Webhook Token
            });
client.on("guildCreate", async (guild, client) => {
  
    let joinembed = new Discord.MessageEmbed()
      .setAuthor({ name: guild.name, iconURL: guild.iconURL({dynamic: true }) || "https://cdn.discordapp.com/avatars/975028020198928404/1aa89f839b68749a296b086603da613f.jpg" })
      .setThumbnail(guild.iconURL({dynamic: true }) || "https://cdn.discordapp.com/avatars/975028020198928404/1aa89f839b68749a296b086603da613f.jpg" )
      .setColor(ee.color)
      .addFields(
        {
          name: 'General',
          value: `
Name: ${guild.name}
Guild ID: ${guild.id}
Created at: <t:${parseInt(guild.createdTimestamp / 1000)}:R>
Owner: <@${guild.ownerId}>
Member Count: ${guild.memberCount} member(s)

Description: ${guild.description || "No Description"} `
        }
      )
      .setFooter({ text: `New Server!` });
      
  wbc.send({ embeds: [joinembed] });
  
            guild.members.cache.get(guild.ownerId)?.send({ embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setTitle("Hey 👋, Thanks for inviting me to your server!")
                .setDescription(`I'm NinoMusic\nSupport: [Here](https://discord.gg/pD6VPPhWXC)\nInvite [Here](https://discord.com/oauth2/authorize?client_id=975028020198928404&permissions=2184563009&scope=bot%20applications.commands)
Vote Nino [Here](https://top.gg/bot/975028020198928404/vote)`).setFooter({ text: "Thanks again!" })
            ]})
})