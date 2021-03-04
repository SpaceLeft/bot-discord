const config = require("../../config.json")
const Discord = require("discord.js")
const { Database } = require("quickmongo");
const db = new Database(config.database);
module.exports = {
    name: "rep",
    run: async (client, message) => {
const Milliseconds = require("pretty-ms");
if(message.author.bot) return; 
let on_or_off = await db.get(`blacklist.${message.author.id}`); if(on_or_off === null) on_or_off = false; if(on_or_off === true) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("You're cannot use the economic system because you're blacklisted"))
const member = message.guild.member(message.mentions.users.first() || false);
if(!member) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("Make sure to mention a user next time."))
if(member.id == message.author.id) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("You can't rep your self."))
const repTime = await db.get(`REP_TIME.${message.author.id}`);
if(repTime < Date.now() || !repTime){
await db.set(`REP_TIME.${message.author.id}`, (Date.now() + 86400000));
await db.add(`REPs.${member.user.id}`, 1);
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`${message.author.username} has given ${member} a reputation point.`))
}else {
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`You can give rep again after ${Milliseconds(repTime - Date.now())}.`))
}
}}