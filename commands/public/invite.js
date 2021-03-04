const Discord = require('discord.js')
module.exports = {
    name: "help",
    cooldown: 5,
    run: async (client, message, args) => {
      message.channel.send(new Discord.MessageEmbed().setColor("9e1c36").setDescription(`**For add me [Click here](https://discord.com/oauth2/authorize?client_id=803919676618833941&scope=bot&permissions=8)\n\n For support server [Click here](https://discord.gg/YE4JEphRAW)**`))
    }}