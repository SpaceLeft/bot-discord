const config = require("../../config.json")
const Discord = require("discord.js")
const { Database } = require("quickmongo");
const db = new Database(config.database);
module.exports = {
    name: "daily",
    run: async (client, message) => {
      if(message.author.bot) return; 
const ms = require("parse-ms"); 
let on_or_off = await db.get(`blacklist.${message.author.id}`); if(on_or_off === null) on_or_off = false; if(on_or_off === true) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("You can't use the economic system because you're blacklisted"))
 let timeout = 86400000; // 24 hours in milliseconds, change if you'd like.
    let amount = Math.floor(Math.random() * 1000) + 1;
    let daily = await db.fetch(`claim.${message.author.id}`);
    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`You can claim again after ${time.hours}h ${time.minutes}m ${time.seconds}s`))
    } else {
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`You have claimed your daily reward of \`${amount}\` coins!`))
await db.add(`coins.${message.author.id}`, parseInt(amount));
await db.set(`claim.${message.author.id}`, Date.now());}}}
