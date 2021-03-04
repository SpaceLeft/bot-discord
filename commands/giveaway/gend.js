const db = require("quick.db")
const Discord = require("discord.js")
const ms = require("ms");

module.exports = {
    name: "gend",
    aliases: ['gend'],
    run: async (client, message) => {    




if(message.author.bot) return;
 let args = message.content.split(" ") 
let role = db.fetch(`role_${message.guild.id}`)
if(role === null) role = "Manage Giveaway"
if(!message.member.hasPermission("MANAGE_GUILD") && !message.member.roles.cache.some((r) => r.name === role)){
return message.reply(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("#9e1c36").setDescription(`You do not have permission \`MANAGE_GUILD\` | Or Role ${role}`));
    }if(!args[1]){return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("#9e1c36").setDescription(`You have to specify a valid message ID!`))}
let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[1]);
if(!giveaway){return message.channel.send(new Discord.Messagembed().setDescription(` ❌ Unable to recognize this id giveaway`+ "** **" + "`" + args.join(' ') + "`" + "."));}
client.giveawaysManager.edit(giveaway.messageID, {
setEndTimestamp: Date.now()}).then(() => {
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("#9e1c36").setDescription(`<:24:784024079496642592> The giveaway will be finished in less than:` + "** **" + "`" + (client.giveawaysManager.options.updateCountdownEvery/1000) + "`" + "** **" + `second(s)`+ "."));})
.catch((e) => {
if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(` ❌ Unable to recognize this id giveaway` + "** **" + "`" + giveaway.messageID + "`" + ".").setColor("#9e1c36"));
} else {console.error(e);
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("#9e1c36").setDescription(` ❌ This giveaway already ended or deleted!`));
}});}}