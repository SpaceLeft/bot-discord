
const db = require("quick.db")
const Discord = require("discord.js")
const ms = require("ms");

module.exports = {
    name: "gset-role",
    aliases: ['gset-role'],
    run: async (client, message) => {    

if(message.author.bot) return;
if(!message.member.hasPermission("MANAGE_GUILD")){return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("#9e1c36").setDescription("You dont have `MANAGE_GUILD` permission"))}
let edit = db.fetch(`role_${message.guild.id}`)
if(edit === null) edit = false
var role = message.mentions.roles.first();
if(!role) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("#9e1c36").setDescription("You must mention the role to setrole giveaways"))
db.set(`role_${message.guild.id}`, role.name)
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("#9e1c36").setDescription(`\`${role.name}\` has been set successfully to giveaways role <:24:784024079496642592>`))
}}