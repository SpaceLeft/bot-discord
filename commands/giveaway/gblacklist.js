const db = require("quick.db")
const Discord = require("discord.js")
const ms = require("ms");

module.exports = {
    name: "gblacklist",
    aliases: ['gblacklist'],
    run: async (client, message) => {    


if(message.author.bot) return;
if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("#9e1c36").setDescription("You must have adminstrator permission"))
let user_black = message.mentions.users.first()
if(!user_black) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`) .setColor("#9e1c36").setDescription("mention next time"))
let on_or_off = await db.get(`blacklist_${user_black.id}_${message.guild.id}`);
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`${user_black} has been \`${on_or_off ? "UnBlacklisted" : "BlackListed"}\``).setColor("#9e1c36"));
await db.set(`blacklist_${user_black.id}_${message.guild.id}`, on_or_off ? false : true);
}}