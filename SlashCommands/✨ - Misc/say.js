module.exports = {
    name: "say",
    description: "Say a message with Nino!",
    options: [
        {
            name: 'message',
            description: 'Message you want me to say',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction, args) => {
      interaction.followUp({ content: interaction.options.getString('message')})
    }
}