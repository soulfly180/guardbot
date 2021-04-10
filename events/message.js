const discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
let talkedRecently = new Set();
module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
	setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
         if (cmd.conf.karaliste === true) {
  const Database = require("plasma-db");
  const db = new Database("./anti-raid.json");
            let enginar = db.fetch(`karaliste_${message.guild.id}.${message.author.id}`)
            if (!message.guild.owner.id.includes(message.author.id) && message.author.id == enginar) {
              const embed = new discord.MessageEmbed()
                          .setDescription(`:x: **${cmd.help.name}** isimli komutu kullanabilmek için sunucu sahibi olman ve ya kara listeden çıkartılman gerek!`)
                          .setColor("RED")
                      message.channel.send({embed})
                      return
            }
          }
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};
