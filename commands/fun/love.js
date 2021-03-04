const Canvas = require("canvas");
const { registerFont } = require("canvas")
registerFont('./public/fonts/fount.ttf', { family: 'fount1' })
const config = require("../../config.json")
const Discord = require("discord.js")
const { Database } = require("quickmongo");
const db = new Database(config.database);
module.exports = {
    name: "profile",
    cooldown: 15,
    run: async (client, message, args) => {
let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100']
let number = numbers[Math.floor(Math.random() * numbers.length)];
const user = message.mentions.users.first()
const canvas = Canvas.createCanvas(750, 250)
const ctx = canvas.getContext('2d')
const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/806425473809645578/806459917408927754/Untitled-1.png")
const avatar = await Canvas.loadImage(message.author.avatarURL({ format: 'png' }));
const avatar2 = await Canvas.loadImage(user.avatarURL({ format: 'png' }));
let fontSize = 80;
ctx.font = `${fontSize -= 10}px fount3`;

ctx.drawImage(background, -0.2, 60, canvas.width, canvas.height);
ctx.drawImage(avatar2, 550, 66, 115, 115);
ctx.drawImage(avatar, 102, 66, 115, 115);
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#fff';
ctx.fillText(`${number}%`, canvas.width / 2.15, canvas.height / 1.8);

      
      const att = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
      message.channel.send(`**❤ Love Meter ❤**`, att)
      

   }}