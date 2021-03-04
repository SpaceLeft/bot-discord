const config = require("../config.json");
const { Database } = require("quickmongo");
const db = new Database(config.database);
const Discord = require("discord.js")


module.exports = async (client, member) => {
    db.add(`oldmembers_${member.guild.id}`, 1)

  const entry1 = await member.guild
    .fetchAuditLogs()
    .then(audit => audit.entries.first());
  if (entry1.action === "MEMBER_KICK") {
    const entry2 = await member.guild
      .fetchAuditLogs({ type: "MEMBER_KICK" })
      .then(audit => audit.entries.first());
    const entry = entry2.executor;
    let trustedusers = await db.get(`trustedusers_${member.guild.id}`);
    if (trustedusers && trustedusers.find(find => find.user == entry.id)) {
      return;
    }
    await db.add(`executer_${member.guild.id}_${entry.id}_kicklimts`, 1);
    let author = await db.get(
      `executer_${member.guild.id}_${entry.id}_kicklimts`
    );
    let limts = await db.get(`kicklimts_${member.guild.id}`);
    if (limts === null) {
      return;
    }
    let logs = await db.get(`acitonslogs_${member.guild.id}`);
    if (!logs) return;
    if (author > limts) {
      let punishment = await db.get(`punishment_${member.guild.id}`);
      if (punishment === null) punishment = "removerole";
      if (punishment === "roleremove") {
        member.guild.members.cache
          .get(entry.id)
          .roles.cache.map(async userroles => {
            member.guild.members.cache.get(entry.id).roles.remove(userroles.id);
            await db.delete(
              `executer_${member.guild.id}_${entry.id}_kicklimts`
            );
            let logsembed = new Discord.MessageEmbed()
              .setFooter(member.guild.name, member.guild.iconURL())
              .setThumbnail(entry.avatarURL())
              .setTitle("Protection Log")
              .setColor("9e1c36").setDescription(`This User :
Name: \`${entry.username}\`
ID: \`${entry.id}\`
Tag: \`${entry.tag}\`
Made: \`Kick Members\`
[Breaking Kick Members Limits]`);
            client.channels.cache.get(logs).send(logsembed);
          });
      }
      if (punishment === "ban") {
        member.guild.members.cache.get(entry.id).ban();
        await db.delete(`executer_${member.guild.id}_${entry.id}_kicklimts`);
        let logsembed = new Discord.MessageEmbed()
          .setFooter(member.guild.name, member.guild.iconURL())
          .setThumbnail(entry.avatarURL())
          .setTitle("Protection Log")
          .setColor("9e1c36").setDescription(`This User :

Name: \`${entry.username}\`
ID: \`${entry.id}\`
Tag: \`${entry.tag}\`
Made: \`Kick Members\`
[Breaking Kick Members Limts]`);
        client.channels.cache.get(logs).send(logsembed);
      }
      if (punishment === "kick") {
        member.guild.members.cache.get(entry.id).kick();
        await db.delete(`executer_${member.guild.id}_${entry.id}_kicklimts`);
        let logsembed = new Discord.MessageEmbed()
          .setFooter(member.guild.name, member.guild.iconURL())
          .setThumbnail(entry.avatarURL())
          .setTitle("Protection Log")
          .setColor("9e1c36").setDescription(`This User :
Name: \`${entry.username}\`
ID: \`${entry.id}\`
Tag: \`${entry.tag}\`
Made: \`Kick Members\`
[Breaking Kick Members Limts]`);
        client.channels.cache.get(logs).send(logsembed);
      }
      return;
    }
    let warn = await db.get(
      `executer_${member.guild.id}_${entry.id}_kicklimts`
    );
    let logsembed = new Discord.MessageEmbed()
      .setThumbnail(entry.avatarURL())
      .setFooter(member.guild.name, member.guild.iconURL())
      .setTitle("Protection Log")
      .setColor("9e1c36").setDescription(`This User :
Name: \`${entry.username}\`
ID: \`${entry.id}\`
Tag: \`${entry.tag}\`
Made: \`Kick Members\`
[Kicking Members.. \`${warn || 0}/${author || 0}\`]`);
    client.channels.cache.get(logs).send(logsembed);
  }
    const entry15 = await member.guild
    .fetchAuditLogs()
    .then(audit => audit.entries.first());
  if (entry15.action === "MEMBER_BAN_ADD") {
    const entry2 = await member.guild
      .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
      .then(audit => audit.entries.first());
    const entry = entry2.executor;
    let trustedusers = await db.get(`trustedusers_${member.guild.id}`);
    if (trustedusers && trustedusers.find(find => find.user == entry.id)) {
      return;
    }
    await db.add(`executer_${member.guild.id}_${entry.id}_banlimts`, 1);
    let author = await db.get(
      `executer_${member.guild.id}_${entry.id}_banlimts`
    );
    let limts = await db.get(`banlimts_${member.guild.id}`);
    if (limts === null) {
      return;
    }
    let logs = await db.get(`acitonslogs_${member.guild.id}`);
    if (!logs) return;
    if (author > limts) {
      let punishment = await db.get(`punishment_${member.guild.id}`);
      if (punishment === null) punishment = "roleremove";
      if (punishment === "roleremove") {
        member.guild.members.cache
          .get(entry.id)
          .roles.cache.map(async userroles => {
            member.guild.members.cache.get(entry.id).roles.remove(userroles.id);
            await db.delete(`executer_${member.guild.id}_${entry.id}_banlimts`);
            let logsembed = new Discord.MessageEmbed()
              .setThumbnail(entry.avatarURL())
              .setFooter(member.guild.name, member.guild.iconURL())
              .setTitle("Protection Log")
              .setColor("9e1c36").setDescription(`This User :
Name: \`${entry.username}\`
ID: \`${entry.id}\`
Tag: \`${entry.tag}\`
Made: \`Ban Members\`
[Breaking Ban Members Limts]`);
            client.channels.cache.get(logs).send(logsembed);
          });
      }
      return;
    }
    let warn = await db.get(`executer_${member.guild.id}_${entry.id}_banlimts`);
    let logsembed = new Discord.MessageEmbed()
      .setThumbnail(entry.avatarURL())
      .setFooter(member.guild.name, member.guild.iconURL())
      .setTitle("Protection Log")
      .setColor("9e1c36").setDescription(`This User :
Name: \`${entry.username}\`
ID: \`${entry.id}\`
Tag: \`${entry.tag}\`
Made: \`Ban Channels\`
[Banning Members.. \`${warn || 0}/${author || 0}]\``);
    client.channels.cache.get(logs).send(logsembed);
  }
}
