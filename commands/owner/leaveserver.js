const Discord = require("discord.js");
const ownerid = ["743151473252106272"];
const ownerid2 = ["743151473252106272"];

module.exports = {
  config: {
    name: "leaveserver",
    aliases: [""],
    category: "owner",
    description: "Displays the list of servers the bot is in!",
    usage: " ",
    accessableby: "Owner"
  },
  run: async (client, message, args) => {
    if (message.author.id == ownerid || ownerid2) {
      if (!message.guild.me.hasPermission("ADMINISTRATOR"))
        return message.channel
          .send("I Dont Have Permissions")
          .then(msg => msg.delete({ timeout: 5000 }));
		
		    const guildId = args[0];
 
    if (!guildId) {
      return message.channel.send("Please provide an id");
    }
 
    const guild = client.guilds.cache.find((g) => g.id === guildId);
 
    if (!guild) {
      return message.channel.send("That guild wasn't found");
    }
 
    try {
      await guild.leave();
      message.channel.send(`Successfully left guild: **${guild.name}**`);
    } catch (e) {
      console.error(e);
      return message.channel.send("An error occurred leaving that guild");
    }
    }
  }
};
