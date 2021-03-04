const Discord = require("discord.js")
const config = require("../../config.json")
const { Database } = require("quickmongo");
const db = new Database(config.database);module.exports = {
    name: "background",
    cooldown: 10,
    run: async (client, message, args) => {

 const url = args[0]
 if(!url) return message.channel.send(new Discord.MessageEmbed().setDescription("Please use an image url"))
 if(url.includes(".webp")) return message.channel.send(new Discord.MessageEmbed().setDescription("You can't use .webp images").setColor("9e1c36").setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`))
 if(url.includes(".gif")) return message.channel.send(new Discord.MessageEmbed().setDescription("You can't use .gif images").setColor("9e1c36").setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`))
 if(url.includes(".psd")) return message.channel.send(new Discord.MessageEmbed().setDescription("You can't use.psd images").setColor("9e1c36").setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`))
 if(url.includes(".PDF")) return message.channel.send(new Discord.MessageEmbed().setDescription("You can't use .PDF images").setColor("9e1c36").setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`))
 if(url.includes(".TIFF")) return message.channel.send(new Discord.MessageEmbed().setDescription("You can't use .TIFF images").setColor("9e1c36").setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`))
 if(url.includes(".PSD")) return message.channel.send(new Discord.MessageEmbed().setDescription("You can't use .PSD images").setColor("9e1c36").setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`))
 if(url.includes(".EPS")) return message.channel.send(new Discord.MessageEmbed().setDescription("You can't use .EPS images").setColor("9e1c36").setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`))
 if(url.includes(".web")) return message.channel.send(new Discord.MessageEmbed().setDescription("You can't use .web images").setColor("9e1c36").setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`))
 if(url.includes(".svg")) return message.channel.send(new Discord.MessageEmbed().setDescription("You can't use .svg images").setColor("9e1c36").setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`))
 db.set(`background_${message.author.id}`, url)
 message.channel.send(new Discord.MessageEmbed().setColor("9e1c36").setDescription("**Profile photo changed successfuly!**").setImage(url).setColor("9e1c36").setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`))
    }}