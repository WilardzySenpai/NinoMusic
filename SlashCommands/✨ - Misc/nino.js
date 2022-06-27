const config = require("../../config.json");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	name: 'nino',
	description: 'Sends random Nino pics!',
	run: async (client, interaction, args) => {

		if (!interaction) return;

		const { ninos } = config;

		const ninoEmbed = new MessageEmbed() 
			.setTitle("Nino Pictures")
			.setImage(`${ninos[Math.floor(Math.random() * ninos.length)]}`)
			.setColor(config.color)
      .setFooter(`Requested by ${interaction.user.tag}`)
      .setTimestamp()
    
		try {
			const btn = new MessageActionRow().addComponents(new MessageButton().setCustomId('moreNino').setLabel('More Nino').setStyle('PRIMARY').setEmoji("982119530451066891"));
			const dbtn = new MessageActionRow().addComponents(new MessageButton().setCustomId('moreNino').setLabel('More Nino').setStyle('PRIMARY').setEmoji("982119530451066891").setDisabled(true));
			const filter = (i) => i.customId === 'moreNino' && i.user.id === interaction.user.id;

			const moreNino = async (msg) => {
				if (!msg) return;
				msg.awaitMessageComponent({ filter, time: 60000 })
					.then(async (interaction) => {
						// interactioneraction (button) received
            let ninoEmbed = new MessageEmbed()
            .setTitle("Nino Pictures")
						.setImage(`${ninos[Math.floor(Math.random() * ninos.length)]}`)
            .setColor(config.color)
            .setFooter(`Requested by ${interaction.user.tag}`)
            .setTimestamp()
						const msg = await interaction.update({ embeds: [ninoEmbed], components: [btn], fetchReply: true }).catch(() => { });
						moreNino(msg);
					}).catch(() => {
						// nothing received after 1 minute
						if (!msg.deleted && msg.editable) return msg.edit({ embeds: [ninoEmbed], components: [dbtn] }).catch(() => { });
						return;
					});
			}

			const msg = await interaction.editReply({ embeds: [ninoEmbed], components: [btn], fetchReply: true }).catch(() => { return });
			return moreNino(msg);
		} catch (err) {
			const ignore = [10062];
			if (!ignore.includes(err.code))
				console.error(err);
		}
	},
};