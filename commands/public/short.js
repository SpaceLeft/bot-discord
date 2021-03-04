const Discord = require("discord.js");
const shorten = require("isgd");
const color = "9e1c36"
module.exports = {
        name: "short",
        cooldown: 5,
        aliases: ["short"],

    run: async (message, args) => {
        if (!args[0])
      return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription("**Proper Usage: +shorten <URL> [title]**").setColor("9e1c36"));
        if (!args[1]) {
        shorten.shorten(args[0], function(res) {
        if (res.startsWith('Error:')) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription("**Please enter a valid URL!**").setColor(color))
        message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`**<${res}>**`).setColor(color));
        })
        } else {
    
        shorten.custom(args[0], args[1], function(res) {

        if (res.startsWith('Error:')) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`**<${res}>**`).setColor(color))
        message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`**<${res}>**`).setColor(color))
        })
        }
    }
};