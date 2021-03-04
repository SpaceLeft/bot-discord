const Discord = require("discord.js")
const db = require("quick.db")
const Canvas = require("canvas")
const { registerFont } = require('canvas'); 
registerFont('./public/fonts/fount.ttf', { family: 'fount1' })
const language = "en"


module.exports = {
    name: "points",
    aliases: ['نقاط'],
    cooldown: 10,
    run: async (client, message) => {    


    let member = message.mentions.users.first()
    if (!member) member = message.author
    let points = db.get(`potins_${message.guild.id}_${member.id}`)
    if (!points) {
      member.id == message.author.id ? message.reply(new Discord.MessageEmbed().setDescription(`ليس لديك نقاط ابدء بألعب الان!`).setColor("9e1c36")) : message.reply(new Discord.MessageEmbed().setDescription("هذا الشخص لا يملك اي نقاط").setColor("9e1c36"))
      return
    }
    const canvas = Canvas.createCanvas(477, 475);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/585070815129763846/779999845288509450/profile.png');
    let numfontSize = 50;
    let namefontSize = 45;
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#36393f';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
const applyText = (canvas, text) => {
  const ctx = canvas.getContext('2d');
  let fontSize = 160;
  do {
    ctx.font = `${fontSize -= 10}px fount1`;
  } while (ctx.measureText(text).width > canvas.width - 300);
  return ctx.font;
};
    // Assign the decided font to the canvas
    ctx.font = applyText(canvas, member.username);
    ctx.fillStyle = '#74273a';
    ctx.font = `${namefontSize -= 10}px sans-serif`;
    ctx.fillText(member.username, canvas.width / 8.60, canvas.height / 1.71);
    ctx.font = applyText(canvas, points);
    ctx.fillStyle = '#74273a';
    ctx.font = `${numfontSize -= 10}px sans-serif`;
    ctx.fillText(points, canvas.width / 1.70, canvas.height / 1.22);
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();


    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'mypoints.png');

    message.channel.send(attachment)
  }
}
