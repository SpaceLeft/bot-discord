const language = "en";
const db = require("quick.db")

const Discord = require("discord.js")
const clinet = new Discord.Client();
const antiSpam = new (require("discord-anti-spam"))({
    warnThreshold: 3,
    kickThreshold: 7,
    banThreshold: 7,
    maxInterval: 2000,
    warnMessage: new Discord.MessageEmbed().setDescription(`{@user} Stop spaming`).setColor('9e1c36'),
    banMessage:  new Discord.MessageEmbed().setDescription(`{user_tag} has been baned becuse spaming`).setColor('9e1c36'),
    maxDuplicatesWarning: 7,
    maxDuplicatesBan: 12,
    exemptPermissions: [],
    ignoreBots: false,
    verbose: true,
    ignoredUsers: []
  });

module.exports = {
    name: "anti-spam",
    description: "Turn on anti spam",
    permissions: 'ADMINISTRATOR',
    run: async (client, message, args) => {
 

  if(message.author.bot || !message.guild)return;
  let on_or_off = db.get(message.guild.id);
  message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`**Anti Spam is __${on_or_off ? "OFF" : "ON"}__**`).setColor('9e1c36'));
  db.set(message.guild.id, on_or_off ? false : true);
}}
clinet.on("message", message => message.guild ? (db.get(message.guild.id) ? antiSpam.message(message) : null) : null);
