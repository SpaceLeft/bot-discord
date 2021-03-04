const db = require("quick.db")
const Discord = require("discord.js")
const ms = require("ms");

module.exports = {
    name: "gcheck",
    aliases: ['gcheck'],
    run: async (client, message) => {    


if(message.author.bot) return;
if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("#9e1c36").setDescription("You must have adminstrator permission"))
let user_black = message.mentions.users.first()
if(!user_black) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`) .setColor("#9e1c36").setDescription("mention next time"))
let black = await db.get(`blacklist_${user_black.id}_${message.guild.id}`);
if(black  === null) black = false;
if(black  == true) black = "Blacklisted";
if(black  == false) black = "UnBlacklisted";
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`${user_black}'s \`${black}\``).setColor("#9e1c36"));
}}
