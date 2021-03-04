const { Client, MessageEmbed  } = require("discord.js"),
      {          Aki          } = require("aki-api"),
      emojis = ["👍", "👎", "❔", "🤔", "🙄", "❌"],
      Started = new Set();

new Client({messageCacheMaxSize: 50})
module.exports = {
    name: "emoji",
    aliases: ['ايموجي'],
    run: async (client, message) => {  
      if (message.author.bot || !message.guild) return;
if(!Started.has(message.author.id))Started.add(message.author.id);
else return message.channel.send(new MessageEmbed().setDescription("**The game already started please wait..**"));
      const aki = new Aki("ar"); // Full languages list at: https://github.com/jgoralcz/aki-api
      await aki.start();
const msg = await message.channel.send(new MessageEmbed()
                                       .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
                                       .setColor("9e1c36")
                                       .setDescription(`\`\`\`${aki.question}\`\`\`\n${aki.answers.map((x, i) => `${x} | ${emojis[i]}`).join("\n")}`));
for(let emoji of emojis){
      try {
            await msg.react(emoji);
      }catch(e){
            console.error(e);
      }}
const collector = msg.createReactionCollector((reaction, user) => emojis.includes(reaction.emoji.name) && user.id === message.author.id,{ time: 60000 * 6 });
      collector.on("collect", async (reaction, user) => {
      reaction.users.remove(user).catch(console.error);
if(reaction.emoji.name == "❌")return collector.stop();

await aki.step(emojis.indexOf(reaction.emoji.name));
if (aki.progress >= 70 || aki.currentStep >= 78) {
          await aki.win();
          collector.stop();
          message.channel.send(new MessageEmbed()
              .setTitle("```Is this your character?```")
              .setDescription(` \`\`\`${aki.answers[0].name}\`\`\` \n\`\`\`${aki.answers[0].description}\`\`\` \n\`\`\`Ranking as : #${aki.answers[0].ranking}\`\`\`\n\n\`\`\`yes (Y) / no (N)\`\`\` `)
              .setImage(aki.answers[0].absolute_picture_path)
              .setColor("9e1c36"));
message.channel.awaitMessages(
response => ["yes","y","no","n"].includes(response.content.trim().toLowerCase()) &&
response.author.id == message.author.id, { max: 1, time: 30000, errors: ["time"] })
        .then(collected => {
           const content = collected.first().content.trim().toLowerCase();
              if (content == "y" || content == "yes")
                   return message.channel.send(new MessageEmbed()
                    .setColor("9e1c36")
                    .setTitle("Great! Guessed right one more time.")
                    .setDescription("I love playing with you!"));
              else 
                  return message.channel.send(new MessageEmbed()
                    .setColor("9e1c36")
                    .setTitle("Uh. you are win")
                    .setDescription("I love playing with you!"));
            });
          return;
        }
         msg.edit(new MessageEmbed()
                  .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
                  .setColor("9e1c36")
                  .setDescription(`\`\`\`${aki.question}\`\`\`\n${aki.answers.map((x, i) => `${x} | ${emojis[i]}`).join("\n")}`));
   });
  
  
collector.on("end",()=>{ Started.delete(message.author.id);
                         msg.delete({ timeout: 1000 }).catch(()=>{});
                      });   
}}