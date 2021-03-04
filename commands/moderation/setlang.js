/*const pre = "+";
const language = "en";
const { MessageEmbed } = require("discord.js");
const db = require("quick.db")




module.exports = {
    name: "setlang",
    description: "change bot lang",
    permissions: 'ADMINISTRATOR',
    run: async (client, message, args) => {

    var args = message.content.toLowerCase().split(" ");

    if (args[1] === `ar`) {
      if (args[1] === lang){
        
        let embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
        .setDescription("اللغة الحالية هي بالفعل :** العربية**")
        .setColor("9e1c36")
        return message.channel.send(embed);
      }
      db.set(`lang_${message.guild.id}`, `${args[1]}`);
      let embe2d = new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
      .setDescription("لغة البوت الجديدة هي : **العربية**")
      .setColor("9e1c36")
      message.channel.send(embe2d);
    } else if (args[1] === `en`) {
      if (args[1] === lang){
        let embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
        .setDescription(`Your language is already , **${args[1]}**`)
        .setColor("9e1c36")
        return message.channel.send(embed);
      }
      db.set(`lang_${message.guild.id}`, `${args[1]}`);
      let embed = new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
      .setDescription("Your new bot language is , **English**.")
      .setColor("9e1c36")
      message.channel.send(embed);
    } else {
      let embed = new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
      .setDescription("Available languages are Ar and En.")
      .setColor("9e1c36")
      message.channel.send(embed);
    }
  }
}*/