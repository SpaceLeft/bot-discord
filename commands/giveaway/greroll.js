
const db = require("quick.db")
const Discord = require("discord.js")
const ms = require("ms");

module.exports = {
    name: "greroll",
    aliases: ['greroll'],
    run: async (client, message) => {    


if(message.author.bot) return;
 let args = message.content.split(" ") 
  let role = db.fetch(`role_${message.guild.id}`)
  if(role === null) role = "Manage Giveaway"
if(!message.member.hasPermission("MANAGE_GUILD") && !message.member.roles.cache.some((r) => r.name === role)){
return message.channel.send(new Discord.MessageEmbed().setDescription(`You do not have permission \`MANAGE_GUILD\` | Or ${role} Role `).setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("#9e1c36"));
}
if(!args[1]){return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("#9e1c36").setDescription(`You have to specify a valid message ID!`))}
let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[1]);
if(!giveaway){ return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("#9e1c36").setDescription(`Unable to recognize this id giveaway:` + "** **" + "`" + args.join(' ') + "`" + "."));}
let messageID = args[1];
client.giveawaysManager.reroll(messageID, {messages: {congrat: `<:24:784024079496642592> New winner(s): {winners}! Congratulations!`,error: `There weren't enough participants for this giveaway i can't choose!`}
}).catch((err) => {
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`Unable to recognize this id giveaway:` + "** **" + "`" + messageID + "`" + ".").setColor("9e1c36"));
});
}}