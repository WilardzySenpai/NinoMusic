const { MessageEmbed, Message } = require("discord.js");
const ee = require("../../config.json");
const { check_if_dj } = require("../../util/functions");

module.exports = {
	name: "qstatus",
	description: "Shows the Queue Status",
	run: async (client, interaction) => {
		try {
			//things u can directly access in an interaction!
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
						new MessageEmbed().setColor(ee.wrongcolor).setTitle("There's nothing playing right now.")
					],
					ephemeral: true
				})
        var djs = client.settings.get(newQueue.id, `djroles`);
        if(!djs || !Array.isArray(djs)) djs = [];
        else djs = djs.map(r => `<@&${r}>`);
        if(djs.length == 0 ) djs = "`None`";
        else djs.slice(0, 15).join(", ");
				let newTrack = newQueue.songs[0];
				let embed = new MessageEmbed().setColor(ee.color)
					.setTitle(`Queue Status`)
					.addField(`💡 Requested by:`, `
          ┕${newTrack.user}`, true)
					.addField(`⏱ Duration:`, `
          ┕\`${newQueue.formattedCurrentTime} / ${newTrack.formattedDuration}\``, true)
					.addField(`🌀 Queue:`, `
          ┕\`${newQueue.songs.length} song(s)\`\n┕\`${newQueue.formattedDuration}\``, true)
					.addField(`🔊 Volume:`, `
          ┕\`${newQueue.volume}%\``, true)
					.addField(`♾ Loop:`, `
          ┕${newQueue.repeatMode ? newQueue.repeatMode === 2 ? `✅ \`Queue\`` : `✅ \`Song\`` : `❌ \`None\``}`, true)
					.addField(`↪️ Autoplay:`, `
          ┕${newQueue.autoplay ? `✅` : `❌ \`None\``}`, true)
					.addField(`❔ Download Song:`, `
          ┕[\`Click here\`](${newTrack.streamURL})`, true)
					.addField(`❔ Filter${newQueue.filters.length > 0 ? "s": ""}:`, `
          ┕${newQueue.filters && newQueue.filters.length > 0 ? `${newQueue.filters.map(f=>`✅ \`${f}\``).join(`, `)}` : `❌ \`None\``}`, newQueue.filters.length > 1 ? false : true)
					.addField(`🎧 DJ-Role${djs.length > 1 ? "s": ""}:`, `
          ┕${djs}`, djs.length > 1 ? false : true)
          .setAuthor({ name: `${newTrack.name}`, iconURL: `https://images-ext-1.discordapp.net/external/DkPCBVBHBDJC8xHHCF2G7-rJXnTwj_qs78udThL8Cy0/%3Fv%3D1/https/cdn.discordapp.com/emojis/859459305152708630.gif`}, newTrack.url)
					.setThumbnail(`https://img.youtube.com/vi/${newTrack.id}/mqdefault.jpg`)
					.setFooter({ text: `💯 ${newTrack.user.tag}`, iconURL: newTrack.user.displayAvatarURL({
						dynamic: true
					})});
				interaction.followUp({
					embeds: [embed]
				})
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				interaction.followUp({
					content: ` | Error: `,
					embeds: [
						new MessageEmbed().setColor(ee.color)
						.setDescription(`\`\`\`${e}\`\`\``)
					],
					ephemeral: true
				})
			}
		} catch (e) {
			console.logString(e.stack)
		}
	}
}