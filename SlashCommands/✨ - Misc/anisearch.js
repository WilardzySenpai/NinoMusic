const { Client, CommandInteraction , MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const malScraper = require('mal-scraper');
const ee = require('../../config.json');

module.exports = {
    name: "anisearch",
    description: "Get Information About An Anime",
    options: [
        { 
            name: "name",
            description: "Search an anime for you",
            required: true,
            type: "STRING",
        },
          
    ],

    /**
     *
     * @param {Client} client
     * 
     * @param {CommandInteraction} interaction
     * 
     */
     
    run: async(client, interaction, args) => {
        const msg = await interaction.followUp("Searching...");
        const name = interaction.options.getString("name");
        const search = name;

        malScraper.getInfoFromName(search)
      .then((data) => {
        
        const malEmbed = new MessageEmbed()
          .setAuthor( {name:`My Anime List search result for ${data.title}`.split(' ',' ').join(' ')} )
          .setThumbnail(data.picture)
          .setColor(ee.color)
          .setDescription(data.synopsis)
          .addField("__Premiered__✨", `${data.premiered}`, true)
          .addField("__Broadcast__🎤", `${data.broadcast}`, true)
          .addField("__Genres__🧬", `${data.genres}`, true)
          .addField("__English Title__🏴󠁧󠁢󠁥󠁮󠁧󠁿", `${data.englishTitle}`, true)
          .addField("__Japanese Title__🇯🇵", `${data.japaneseTitle}`, true)
          .addField("__Type__🎴", `${data.type}`, true)
          .addField("__Episodes__📟", `${data.episodes}`, true)
          .addField("__Rating__🌌", `${data.rating}`, true)
          .addField("__Aired__📅", `${data.aired}`, true)
          .addField("__Score__💯", `${data.score}`, true)
          .addField("__Favorite__💖", `${data.favorites}`, true)
          .addField("__Ranked__🎆", `${data.ranked}`, true)
          .addField("__Duration__⏱️", `${data.duration}`, true)
          .addField("__Studios__🎙️", `${data.studios}`, true)
          .addField("__Popularity__📰", `${data.popularity}`, true)
          .addField("__Characters And Roles__🙎‍♂️", `${data.characters ? data.characters.map((x) => `${x.name}: ${x.role}`).join("\n") : "None"}`, true)
          .addField("__Staff And Role__⚚" ,`${data.staff ? data.staff.map((x) => `${x.name}: ${x.role}`).join("\n") : "None"}`, true)
          .addField("__Producers__👨‍💼", `${data.producers ? data.producers.join("\n") : "None"}`, true)
          .addField("__Source__🛈", `${data.source}`, true)
          .addField("__Synonyms__🥢", `\`${data.synonyms}\``, true)
          .addField("__Status__📜", `${data.status}`, true)
          .addField("__Identifier__🪪", `${data.id}`, true)
          .setTimestamp()
          const row = new MessageActionRow()
          .addComponents(
           new MessageButton() //Link Of The Anime In Button
            .setStyle("LINK")
            .setURL(data.url)
            .setLabel("My Anime List")
          );
        return msg.edit({ content: ' ', embeds: [malEmbed], components: [row] });
      })
      .catch((err) => {
        console.log(err)
        return interaction.editReply({
          content: "No Anime Found!"
        });
       });
    },
};