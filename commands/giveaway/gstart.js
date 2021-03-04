
const db = require("quick.db")
const Discord = require("discord.js")
const ms = require("ms");

module.exports = {
    name: "gstart",
    aliases: ['gstart'],
    run: async (client, message) => {  


if(message.author.bot) return;
let role = db.fetch(`role_${message.guild.id}`)
if(role === null) role = "Manage Giveaway"
if(!message.member.hasPermission("MANAGE_GUILD") && !message.member.roles.cache.some((r) => r.name === role)){
return message.reply(`:x: You do not have permission \`MANAGE_GUILD\` | Or Role ${role}`);
    }
let args = message.content.split(" ")
let giveawayDuration = args[1];
if(!giveawayDuration || isNaN(ms(giveawayDuration))){
return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`Type a valid \`time\``).setColor("9e1c36"))
}
let giveawayNumberWinners = args[2];
if(isNaN(giveawayNumberWinners)){return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription
 (`Type the \`number of winners\``))}
let giveawayPrize = args.slice(3).join(' ');
if(!giveawayPrize){ return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription
( `Type the \`prize\``))
}

client.giveawaysManager.start(message.channel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayNumberWinners,
        hostedBy:  message.author ,
        messages: {
            giveaway: "<:24:784024079496642592> **GIVEAWAY** <:24:784024079496642592>",
            giveawayEnded: "<:24:784024079496642592> **GIVEAWAY ENDED** <:24:784024079496642592>",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React With 🎉 to enter!",
            winMessage: "<:24:784024079496642592> Congratulations, {winners}! You Won: **{prize}**!",
            embedFooter: "**GIVEAWAY**",
            noWinner: `Giveaway cancelled, not enough participants `,
            hostedBy: `Hosted By : {user}`,
            winners: "Winner(s)",
            endedAt: "Ends At",
            units: {
                seconds: "second(s)",
                minutes: "minutes(s)",
                hours: "hour(s)",
                days: "day(s)",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

}}