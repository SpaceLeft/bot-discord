const config = require("../config.json");
const { Database } = require("quickmongo");
const db1 = new Database(config.database);
const Discord = require("discord.js");
const db = require("quick.db")
const cooldowns = new Discord.Collection();

module.exports = async (client, message) => {
  
if(!message.guild) return;
  
if (message.author.bot) return;
      
var prefix = await db1.fetch(`prefix.${message.guild.id}`)

if(!prefix) prefix = "+"
  
if (message.content.indexOf(prefix) !== 0) return;
  
const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
const commandName = args.shift().toLowerCase();
  
let aliases = await db1.get(`aliases.${message.guild.id}`);
  
const Allowed = db.fetch(`CommandOn_${message.guild.id}_${commandName.toLowerCase()}`);
  
if (!message.guild.member(client.user).permissions.has("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setDescription(`Give me \`ADMINISTRATOR\` permissions to start use me 😒`))

/* Start aliases */

if(aliases){
  
if (Allowed !== null) return message.channel.send(new Discord.MessageEmbed().setDescription(`**${commandName} command is OFF**`).setColor("9e1c36")).then(msg => { msg.delete({ timeout: 3000 });});

const aliase = aliases.find(x=> x.alias == commandName);

const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) ||client.commands.get(aliase.alias ? aliase.command:undefined);

if(!command) return;

if (command.permissions) { const authorPerms = message.channel.permissionsFor(message.author); if(!authorPerms || !authorPerms.has(command.permissions)) { return message.channel.send(new Discord.MessageEmbed().setColor("9e1c36").setDescription(`**You need \`${command.permissions}\` permissions to use this command**`)) }}
  
if (!cooldowns.has(command.name)) { cooldowns.set(command.name, new Discord.Collection()); } const now = Date.now(); const timestamps = cooldowns.get(command.name); const cooldownAmount = (command.cooldown) * 1000; if (timestamps.has(message.author.id)) { const expirationTime = timestamps.get(message.author.id) + cooldownAmount; if (now < expirationTime) { const timeLeft = (expirationTime - now) / 1000; return message.channel.send(new Discord.MessageEmbed().setColor("9e1c36").setDescription(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)); }} timestamps.set(message.author.id, now); setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  
command.run(client, message, args, prefix); }
  
/* End aliases */

  
/* Start no aliases */
  
if(!aliases){
  
if (Allowed !== null) return message.channel.send(new Discord.MessageEmbed().setDescription(`**${commandName} command is OFF**`).setColor("9e1c36")).then(msg => { msg.delete({ timeout: 3000 });});
  
const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

if(!command) return;
  
if (command.permissions) { const authorPerms = message.channel.permissionsFor(message.author); if(!authorPerms || !authorPerms.has(command.permissions)) { return message.channel.send(new Discord.MessageEmbed().setColor("9e1c36").setDescription(`**You need \`${command.permissions}\` permissions to use this command**`)) }}

if (!cooldowns.has(command.name)) { cooldowns.set(command.name, new Discord.Collection()); } const now = Date.now(); const timestamps = cooldowns.get(command.name); const cooldownAmount = (command.cooldown) * 1000;if (timestamps.has(message.author.id)) {const expirationTime = timestamps.get(message.author.id) + cooldownAmount;if (now < expirationTime) {const timeLeft = (expirationTime - now) / 1000;return message.channel.send(new Discord.MessageEmbed().setColor("9e1c36").setDescription(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`));}}timestamps.set(message.author.id, now);setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  
command.run(client, message, args, prefix); }     
  
/* End no aliases */

var black = db.fetch(`black_${message.guild.id}`);
  
if(black){let embed12 = new Discord.MessageEmbed().setDescription("**This server is blacklisted Please review the support server**").setColor("9e1c36") 

return message.channel.send(embed12)}
  
};