const Canvas = require("canvas");
const { registerFont } = require("canvas")
registerFont('./public/fonts/vermin_vibes.ttf', { family: 'fount2' })
const config = require("../../config.json")
const Discord = require("discord.js")
const { Database } = require("quickmongo");
const db = new Database(config.database);
module.exports = {
    name: "pay",
    cooldown: 10,
    run: async (client, message) => {
const canvas =  Canvas.createCanvas(350, 200);
let on_or_off = await db.get(`blacklist.${message.author.id}`); if(on_or_off === null) on_or_off = false; if(on_or_off === true) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription("You're cannot use the economic system because you're blacklisted"))
const ctx = canvas.getContext('2d');
  let lne = Math.floor(Math.random() * 4000);
  console.log(lne)
const namleftright04 = 70.1;const namupdown14 = 125.1
const WelcomeImage = await Canvas.loadImage("https://cdn.discordapp.com/attachments/799307731784695818/799740350755110962/PicsArt_01-15-10.42.13.jpg");//("https://cdn.discordapp.com/attachments/799307731784695818/799733263035924510/download.jpg")
ctx.drawImage(WelcomeImage, 0, 0, canvas.width, canvas.height);
ctx.font = `100px fount2`;ctx.fillStyle = "BLACK"; 
ctx.fillText(lne, namleftright04, namupdown14);
let args = message.content.split(" ").slice(2).join(" ")
let user =message.mentions.users.first() 
if (!user)return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("Make Mention Next Time."))
let member = await db.fetch(`coins.${message.author.id}`);// تعديل داتا
if (!args)return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("Please type an amount."))
if (message.content.includes("-"))
return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("Negative money can not be paid."))
if (message.author.id == user.id)
return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription("You Can't pay to your self."))
if (member < parseInt(args))return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`You don't have Enough credits to give to ${user.username}`))
if (parseInt(args) < 1)return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`You Must transfer Coins more than \`1\`.`))
if (isNaN(parseInt(args))) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("Only Numbers."));
var taxval = Math.floor(parseInt(args) * (5.4 / 100));
var amount = Math.floor(parseInt(args) - taxval);
const msg = await message.channel.send(`**${message.author.username}, Transfer Fees: \`${taxval}\`, Amount :\`$${amount}\`**\ntype these numbers to confirm :`,{files:[canvas.toBuffer()]})//.setImage(buffer));
const responses =  message.channel.awaitMessages(response => response.content.includes(lne), {
          max: 1,
          time: 20000,
          errors: ['time'],
        }) .then( async ( collected) => {
if(responses !== (lne)){
msg.delete().catch(()=>{});
}
await db.add(`coins.${user.id}`, parseInt(amount))// تعديل داتا
await db.subtract(`coins.${message.author.id}`,parseInt(args))// تعديل داتا
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`${message.author.username} Transfered \`${amount}\` To ${user}`)).then(responses.delete({timeout:1500}));
user.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").addField("From:", `${message.author}`, true).addField("His ID", `\`${message.author.id}\``, true).addField("To", `${user}`).addField("Amount", `${args}`, true).addField("Server Name", `${message.guild.name}`, true)).catch(() => {});
}).catch(() => {
})}}