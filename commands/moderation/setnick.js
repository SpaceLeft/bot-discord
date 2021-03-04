const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const Discord = require("discord.js")

module.exports = {
    config: {
        name: "setnick",
        description: "Sets Or Changes Nickname Of An User",
        permissions: 'ADMINISTRATOR',
    },
    run: async (bot, message, args) => {

      
        if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("**Please Enter A User!**"))
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("**Please Enter A Username!**"));

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription('**Cannot Set or Change Nickname Of This User!**'))

        if (!args[1]) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("**Please Enter A Nickname**"));

        let nick = args.slice(1).join(' ');

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
            .setColor("9e1c36")
            .setDescription(`**Changed Nickname of ${member.displayName} to ${nick}**`)
        message.channel.send(embed)
        } catch {
            return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("**Missing Permissions - [CHANGE_NICKNAME]"))
        }

     
    }
}