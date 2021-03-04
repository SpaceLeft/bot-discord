const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;

module.exports = {
    config: {
        name: "addemoji",
        aliases: [""],
        description: "Adds emoji to serverr",
        category: "moderation",
        usage: "<emojiname> <link>",
        permissions: 'MANAGE_EMOJIES',
    },
    run: async (client, message, args) => {

    
    const emoji = args[0];
    if (!emoji) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`Please give me a Vild Emoji!`).setColor("9e1c36"));

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      const name = args.slice(1).join(" ");
      message.guild.emojis.create(
        `${Link}`,
        `${name || `${customemoji.name}`}`
      );
      const Added = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
        .setTitle(`Emoji Added`)
        .setColor("9e1c36")
        .setDescription(`Emoji Has Been Added! | Preview : [Click Me](${Link})`)
        .setImage(`${Link}`)
      return message.channel.send(Added);
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
       return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`Please give me a Vild Emoji!`).setColor("9e1c36"));
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`You Can Use Normal Emoji Without Adding In Server!`).setColor("9e1c36"));
    }
    }
}