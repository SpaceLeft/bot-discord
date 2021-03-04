const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;
const db = require("quick.db")

module.exports = {
    name: "clear",
    description: "Turn on anti spam",
    permissions: 'MANAGE_MESSAGES',
    run: async (client, message, args) => {


      

    if (!args[0]) args[0] = "100"


    if (isNaN(args[0])) args[0] = "100"

    if (args[0] < 4)
return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`You Can Delete ${args[0]} By Your Self Its Not Too Many Messages!`).setColor("9e1c36"))



    if (args[0] > 100)
return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`I Can't Delete more than 100 messages`).setColor("9e1c36"))



    let Reason = args.slice(1).join(" ") || "No Reason Provided!";

    try {

    message.channel.bulkDelete(Number(args[0])).then(Message => {
      let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
        .setColor("9e1c36")
        .setTitle(`Messages Deleted!`)
        .addField(`Moderator`, `${message.author.tag} `)
        .addField(`Deleted Messages`, `${Message.size}`)
        .addField(`Reason`, `${Reason}`)
      

return message.channel.send(embed)


        .then(msg => msg.delete({ timeout: 5000 }))}
    );

    } catch (error) {}

    //End
  }
};