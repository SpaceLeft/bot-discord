const Discord = require("discord.js")
const db = require("quick.db")
module.exports = {
name: "whitelist",
run: async (client, message, args) => {
let guild = message.guild.iconURL()
if(!message.author.id === message.guild.ownerID) return;
let wordlist = new Discord.MessageEmbed()
.setThumbnail(guild)
.setColor("9e1c36")
.setTitle("Trusted Users List")
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
let database = await db.get(`trustedusers_${message.guild.id}`)
if(database && database.length) {
let array =[];
database.forEach(m => {
array.push(`- Member: <@${m.user}> | ID ${m.user}`)
 });wordlist.setDescription(`${array.join("\n")}`)
}return message.channel.send(wordlist);
}}