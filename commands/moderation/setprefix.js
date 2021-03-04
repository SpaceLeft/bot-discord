const config = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
const { Database } = require("quickmongo");
const db1 = new Database(config.database);

module.exports = {
    name: "setprefix",
    description: "change bot prefix",
    permissions: 'ADMINISTRATOR',
    run: async (client, message, args) => {


  if (!message.guild || message.author.bot) return;
  var args = message.content.toLowerCase().split(" ");
  var cmd = args[0];
  var prefix = await db1.fetch(`prefix.${message.guild.id}`);
  if (prefix == null) prefix = "+";
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    if (!args[1]) {

        let embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
        .setDescription("لم تقم بكتابة البريفكس الجديد")
        .setColor("9e1c36")
        return message.channel.send(embed);
      
    }

    
    await db1.set(`prefix.${message.guild.id}`, `${args[1]}`);

      let embed = new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
      .setDescription(`**البريفكس الجديد هو : \`${args[1]}\`**`)
      .setColor("9e1c36")
      message.channel.send(embed);
   
  }
 }
