const DIG = require("discord-image-generation");
const Discord = require("discord.js")

module.exports = {
    name: "trash",
    run: async (client, message) => {  
      
    const user = message.mentions.users.first() || message.author

    let img = await new DIG.Wanted().getImage(user.avatarURL({ format: 'png' }));
      
    let attach = new Discord.MessageAttachment(img, "trash.png");;
    message.channel.send(attach)
}}