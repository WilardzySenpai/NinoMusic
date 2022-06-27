const client = require("../index");
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const ee = require('../config.json');
client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: true });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

  //Save Song button function
    if (interaction.isButton()){
        const queue = client.distube.getQueue(interaction.guildId);
    switch (interaction.customId) {
        case 'saveTrack': {
       if (!queue || !queue.playing){
       return interaction.reply({ content: `No music currently playing. ❌`, ephemeral: true, components: [] });
       } else {
         const song = queue.songs[0];
      const but_save = new MessageEmbed()
      .setColor(ee.color)
      .setTitle(client.user.username + " - Save Track")
      .setThumbnail(client.user.displayAvatarURL())
      .addField(`🎶 Track`, `\`${song.name}\``)
      .addField(`⏳ Duration`, `\`${song.formattedDuration}\``, true)
      .addField(`🔗 URL`, `${song.url}`)
      .addField(`㊗ Saved Server`, `\`${interaction.guild.name}\``)
      .addField(`➡ Requested By`, `${song.user}`, true)
      .setTimestamp()
      .setFooter({ text: 'Nino Save Music!', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
       interaction.user.send({ embeds: [but_save ] }).then(() => {
        interaction.reply({ content: `✅ | I sent the name of the music via private message.`, ephemeral: true }).catch(e => { })
        }).catch(error => {
        interaction.reply({ content: `❌ | Unable to send you private message.`, ephemeral: true }).catch(e => { })
        });
       }
      }
    } 
  }
});
