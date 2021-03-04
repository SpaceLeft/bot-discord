
///bot code
const Discord = require("discord.js");
const db = require("quick.db")
const language = "en"
module.exports = {
    name: "bot",
    cooldown: 5,
    description: "show bot info",
    run: async (client, message) => {

   
      const bot = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
      .setColor("9e1c36")
      .addField("**Servers** :  ", `➥ ${client.guilds.cache.size}`, true)
      .addField("**Channels** : ", `➥ ${client.channels.cache.size}`, true)
      .addField("**Users** : ", `➥ ${client.users.cache.size}`, true)
      .addField("**Bot Name** :  ", `➥ ${client.user}`, true)
      .addField("**Bot Owner** :  ", `➥ <@306656522438443009> `, true)
      .addField("**Bot Ping :**",` 
     ➥ ${Math.round(client.ws.ping)}ms`)
      .setImage("")

    message.channel.send(bot);
  }}

