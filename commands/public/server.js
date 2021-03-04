const Discord = require("discord.js");
const db = require("quick.db")
const Tickets = require("../../models/tickets.js");
const config = require("../../config.json")
const { Database } = require("quickmongo")
const db1 = new Database(config.database)
////كود معلومات السيرفر
module.exports = {
    name: "server",
    description: "show server info",
    cooldown: 5,
    run: async (client, message, args) => {

const moment = require("moment")
if(message.author.bot) return;
let count = message.guild.premiumSubscriptionCount
let level = "0"
if(count > 1) level = "1"
if(count > 14) level = "2"
if(count > 29) level = "3"
let ticket = message.guild.channels.cache.filter(m => m.name.startsWith("ticket-")).size;
let text = message.guild.channels.cache.filter(m => m.type === "text").size;
let Verification =  message.guild.verificationLevel
let prefix = await db1.fetch(`prefixز${message.guild.id}`);
if(prefix == null) prefix = "+"
if(Verification === "NONE") Verification = "None"
if(Verification === "LOW") Verification = "Low"
if(Verification === "MEDIUM") Verification = "Medium"
if(Verification === "HIGH") Verification = "High"
if(Verification === "VERY_HIGH") Verification = "Very High"
let voice = message.guild.channels.cache.filter(m => m.type === "voice").size;
let reg = message.guild.region
if(reg === "europe") reg = "Europe"
if(reg === "russia") reg = "Russia"
if(reg === "india") reg = "India"
let ashour = "removerole"
let punishment = await db.get(`punishment_${message.guild.id}`);
Tickets.findOne({
guildID: message.guild.id,
}, (err, tickets) => {
if (ashour === null) ashour = "None";
if (punishment === null) punishment = ashour;
message.guild.fetchBans().then(bans =>  {
let embed = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.addField('Owner name', ` \`\`\`${message.guild.owner.user.username}\`\`\` `, true)
.addField("Server Created At:", ` \`\`\`${moment(message.guild.createdAt).fromNow()}\`\`\` `,true)
.addField('Channels', ` \`\`\`Text: ${text} | Voice: ${voice}\`\`\` `, false)
.addField('Roles', `\`\`\`${message.guild.roles.cache.size}\`\`\``, false)
.addField('Region', ` \`\`\`${reg}\`\`\` `, false)
.addField("Members", ` \`\`\`Online: ${message.guild.members.cache.filter(r => r.presence.status === 'online').size} | Idle: ${message.guild.members.cache.filter(r => r.presence.status === 'idle').size} | Dnd: ${message.guild.members.cache.filter(r => r.presence.status === 'dnd').size}  \nOffline: ${message.guild.members.cache.filter(r => r.presence.status === 'offline').size} | Bots: ${message.guild.members.cache.filter(r => r.user.bot).size} | All: ${message.guild.memberCount}\`\`\` `, true)
.addField("Bans",`\`\`\`${bans.size}\`\`\``)
.addField('Boosts', `\`\`\`Level: ${level} | count: ${count}\`\`\``, false)
.addField('Tickets', `\`\`\`Tickets Opened: ${tickets.number}\`\`\``, false)
.addField('Protection Punishment', `\`\`\`${punishment}\`\`\``, false)
.addField('Verification Level', `\`\`\`${Verification}\`\`\``, false)
.addField('Server prefix', `\`\`\`${prefix}\`\`\``, false)
.setColor('#9e1c36')
message.channel.send(embed)})})
}
}