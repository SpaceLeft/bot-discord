const Discord = require('discord.js');


module.exports = {
        name: 'random-avatar',
        description: 'Show user avatar',
    run: async (client, message, args) => {
    
        const member = client.users.cache.random()
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
        .setColor('9e1c36')
        .setDescription(`**Here is your random avatar
This avatar from \`${member.tag} \`**`)
        .setImage(member.displayAvatarURL({ dynamic: true, size: 1024 }))
    return message.channel.send(embed)
    
    }
}
