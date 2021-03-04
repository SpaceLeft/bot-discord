const config = require("../../config.json")
const Discord = require("discord.js")
const { Database } = require("quickmongo");
const db = new Database(config.database);
module.exports = {
    name: "coins",
    cooldown: 10,
    run: async (client, message) => {
      if(message.author.bot) return; 
let on_or_off = await db.get(`blacklist.${message.author.id}`); 
  if(on_or_off === null) on_or_off = false; if(on_or_off === true) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("You can't use the economic system because you're blacklisted"))
let args = message.content.split(" ") 
let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1])); 
if(user){ 
user = user.user 
}else{ 
user = message.author 
} 
let a1 = await db.get(`blacklist.${user.id}`);
if(a1 === null) on_or_off = false; if(a1 === true) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`**${user.username} is blacklisted can't use economy commands**`))
let bal = await db.fetch(`coins.${user.id}`);
if (bal === null) bal = 0;
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`${user.username} have a \`${bal}\` coins`))
}
}