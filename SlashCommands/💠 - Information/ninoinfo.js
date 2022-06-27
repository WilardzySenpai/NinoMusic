const { MessageEmbed, version, CommandInteraction, Client, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');
const ee = require('../../config.json');
const superagent = require('superagent');

module.exports = {
  name: "ninoinfo",
  description: "Show status bot",
  run: async (client, interaction, args) => {

    let connectedchannelsamount = 0;
    let guilds = client.guilds.cache.map((guild) => guild);
    for (let i = 0; i < guilds.length; i++) {
      if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
    }
    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
    let { body } = await superagent.get(`https://api.waifu.pics/sfw/pat`);
    const duration1 = moment.duration(interaction.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const cpu = await si.cpu();
    let ccount = client.channels.cache.size;
    let scount = client.guilds.cache.size;
    let mcount = 0;
    client.guilds.cache.forEach((guild) => {
      mcount += guild.memberCount
    })

    const embed = new MessageEmbed()
      .setColor(ee.color)
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setDescription(`<:nino:982120300009377842> **Status**`)
      .addField('🌐 | Servers', `
        ┕ ${scount}`, true)
      .addField('📰 | Channels', `
        ┕ ${ccount}`, true)
      .addField("📁 | Voice-Channels", `
        ┕ ${client.channels.cache.filter((ch) => ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size}`, true)
      .addField("🔊 | Connections", `
        ┕ ${connectedchannelsamount} Connections`, true)
      .addField('🤦‍♀️ | Users', `
        ┕ ${mcount}`, true)
      .addField('💠 | Discord.js', `
        ┕ v${version}`, true)
      .addField('📶 | Node.js', `
        ┕ ${process.version}`)
      .addField('💥 | CPU', `
        ┕ Cores: ${cpu.core}
        ┕ Model: ${os.cpus()[0].model}
        ┕ Speed: ${os.cpus()[0].speed} MHz`)
      .addField('⚙ | Memory', `
        ┕ Total Memory: ${(os.totalmem() / 1024 / 1024).toFixed(2)} Mbps
        ┕ Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} Mbps
        ┕ Heap Total: ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mbps
        ┕ Heap Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mbps`, true)

    let btnra = new MessageActionRow().addComponents([
      new MessageButton().setCustomId("clickme").setStyle("SUCCESS").setLabel("Click here"),
      new MessageButton().setURL("https://top.gg/bot/975028020198928404/").setStyle("LINK").setLabel("Top.gg").setEmoji("982120760392949811"),
      new MessageButton().setURL("https://discord.com/oauth2/authorize?client_id=982054197732192327&permissions=2184563009&scope=bot%20applications.commands").setStyle("LINK").setLabel("Invite Me").setEmoji("982119530451066891")
    ]);

    let d_btnra = new MessageActionRow().addComponents([
      new MessageButton().setCustomId("clickme").setStyle("SUCCESS").setLabel("Click here").setDisabled(true),
      new MessageButton().setURL("https://top.gg/bot/975028020198928404/").setStyle("LINK").setLabel("Top.gg").setEmoji("982120760392949811"),
      new MessageButton().setURL("https://discord.com/oauth2/authorize?client_id=982054197732192327&permissions=2184563009&scope=bot%20applications.commands").setStyle("LINK").setLabel("Invite Me").setEmoji("982119530451066891")
    ]);

    await interaction.followUp({ embeds: [embed], components: [btnra] }).then(async (msg) => {
      let filter = i => i.user.id === interaction.user.id;
      let collector = await msg.createMessageComponentCollector({ filter: filter, time: 5 * 5000 });
      collector.on('collect', async (btn) => {
        if (btn.isButton()) {
          if (btn.customId === "clickme") {
            await btn.deferUpdate().catch(e => { })
            msg.edit({
              embeds: [new MessageEmbed()
                .setDescription(`atama nade-nade`)
                .setImage(body.url)
                .setColor(ee.color)], components: [d_btnra], content: "Arigato!"
            })
          }
        }
      })
      collector.on('end', () => {
        msg.edit({ embeds: [embed], components: [d_btnra], content: " " })
      })
    })
  }
}