const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const ee = require('../../config.json');

module.exports = {
    name: "rps",
    description: "Rock Paper Scissor!",
    run: async (client, interaction, args) => {
      let hand = [
        {
          txt: 'Rock',
          emoji: '✊',
          index: 0
        },
        {
          txt: 'Paper',
          emoji: '🖐',
          index: 1
        },
        {
          txt: 'Scissors',
          emoji: '✌',
          index: 2
        }
      ];

      let botMove = hand[Math.floor(Math.random()*3)];

      const rpsMsg = await interaction.followUp({
        embeds: [
          new MessageEmbed()
           .setColor(ee.color)
           .setTitle('Rock Paper Scissors')
           .setImage('https://i.imgur.com/ZVh6AwO.gif')
           .setDescription('Choose a handsign!')
        ],
        components: [
          new MessageActionRow()
           .addComponents(
             new MessageButton()
              .setCustomId('rps_rock')
              .setLabel('✊ Rock')
              .setStyle('PRIMARY'),
             new MessageButton()
              .setCustomId('rps_paper')
              .setLabel('🖐 Paper')
              .setStyle('PRIMARY'),
             new MessageButton()
              .setCustomId('rps_scissors')
              .setLabel('✌ Scissors')
              .setStyle('PRIMARY')
           )
        ],
        fetchReply: true
      });

      let win = 0;
      let userMove;

      const filter = interaction => !interaction.user.bot;
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        componentType: 'BUTTON',
        time: 10000
      });

      collector.on('collect', async (i) => {
        if(!i.isButton()) return;

        if(i.customId.startsWith('rps')) {
          await i.deferUpdate();
          let move = i.customId.split('_')[1]
          userMove = hand.find(v => v.txt.toLowerCase() == move);

          switch(move) {
            case 'rock':
              win = botMove.index == 0 ? 1 : (botMove.index == 1 ? 0 : 2);
              break;
            case 'paper':
              win = botMove.index == 0 ? 2 : (botMove.index == 1 ? 1 : 0);
              break;
            case 'scissors':
              win = botMove.index == 0 ? 0 : (botMove.index == 1 ? 2 : 1);
              break;
          }

          let embed = rpsMsg.embeds[0]
          embed.color = ee.color;
          embed.description = `I choose ${botMove.txt}! ${win == 0 ? 'You lost!' : (win == 1 ? 'We tied!' : 'You win!')} (${userMove.emoji} ${win == 0 ? '<' : (win == 1 ? '=' : '>')} ${botMove.emoji})`

          let components = rpsMsg.components

          components[0].components.forEach(comp => {
            if(comp.customId == i.customId) {
              comp.disabled = true;
              comp.style = 'SECONDARY';
            } else comp.disabled = true;
          });

             await rpsMsg.edit({ embeds: [embed], components: components, fetchyReply: true });

          collector.stop()
        }
      });
    }
}