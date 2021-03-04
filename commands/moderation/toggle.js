const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require('quick.db');


module.exports = {
  name: "toggle",
  permissions: 'ADMINISTRATOR',
  description: "Enable Or Disable A Command!",
  run: async (client, message, args) => {



        const Name = args[0];
          const GiveName = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
          .setColor("#9c1c34")
          .setDescription('Please Give A Command Name')
        if (!Name) return message.channel.send(GiveName);
        const comd = Name.toLowerCase()
        const cmd = client.commands.get(Name.toLowerCase());

          const NotFound = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
          .setColor("#9c1c34")
          .setDescription('Command Not Found')
        if (!cmd) return message.channel.send(NotFound) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(comd))

        const Type = args[1];

          const TypeEmbed = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
          .setColor("#9c1c34")
          .setDescription('Please Give A Command Type - On | Off')
        if (!Type) return message.channel.send(TypeEmbed);

        let array = ["on", "off"];

  const InvalidType = new Discord.MessageEmbed()
  .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
          .setColor("#9c1c34")
          .setDescription('Invalid Type - On | Off')
        if (!array.find(a => a === Type.toLowerCase())) return message.channel.send(InvalidType);

        const Current = await db.fetch(`CommandOn_${message.guild.id}_${Name.toLowerCase()}`);
          const Already = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
          .setColor("#9c1c34")
          .setDescription(`Its Already ${Current}!`)
        if (Current && Current.toLowerCase() === Type.toLowerCase()) return message.channel.send(Already);

        if (Current === null && Type.toLowerCase() === "on") return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`) .setColor("#9c1c34") .setDescription(`Its Already on`));

        let Upper = Type.charAt(0).toUpperCase() + Type.slice(1);

        await db.set(`CommandOn_${message.guild.id}_${Name.toLowerCase()}`, Type.toLowerCase() === "on" ? null : Upper);

        let Embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)

        .setColor("#9c1c34")
        .setDescription(`Command Has Been ${Upper === "On" ? "Enabled" : "Disabled"} - <@${message.author.id}>`)

        return message.channel.send(Embed);



  }
}
