const { MessageEmbed } = require('discord.js')
const owner = "743151473252106272"
module.exports = {
    config: {
        name: "uptime",
        description: "Shows Uptime of bot",
    },
    run: async(bot, message, args) => {
      if(message.author.id !== owner) return message.channel.send(new MessageEmbed() .setDescription("Only bot owner can use this command."))
      
        let days = Math.floor(bot.uptime / 86400000);
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;

        const embed = new MessageEmbed()
            .setTitle("Uptime")
            .setColor("9e1c36")
            .setDescription(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`)
        message.channel.send(embed);
    }
}