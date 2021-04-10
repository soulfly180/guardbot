const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send(`<a:no:813835956142473257>・**Bu Komutu** Kullanabilmek İçin **Yetkin Yok !**`)
if (!args[0])  {
    const başarısız = new Discord.MessageEmbed()
    .setTitle('Başarısız')
    .setDescription(`<a:no:813835956142473257>・**Yanlış Kullanım ! Doğru Kullanım !reklam-engel aç**`)
    .setColor("BLUE")
      return message.channel.send(başarısız)
  }   
  if (args [0] == 'aç') {
    db.set(`reklamengel_${message.guild.id}`, '<a:yes:813835795130875914>・**Reklam Engel** Başarılı Bir Şekilde Açıldı !**')
    let lus = await db.fetch(`reklamengel_${message.guild.id}`) 
    const açık = new Discord.MessageEmbed()
    .setTitle('Başarılı')
    .setDescription('<a:yes:813835795130875914>・**Reklam Engel** Başarılı Bir Şekilde Açıldı !**')
    .setColor("BLUE")
    return message.channel.send(açık)
  }  
  if (args [0] == 'kapat') {    
    db.delete(`reklamengel_${message.guild.id}`)
   const kapat = new Discord.MessageEmbed()
    .setTitle('Başarılı')
    .setDescription('<a:yes:813835795130875914>・**Reklam Engel** Başarılı Bir Şekilde Açıldı !**')
    .setColor("BLUE")
    return message.channel.send(kapat)
  }
};
exports.conf = {
 enabled: true,
 guildOnly: false,
  aliases: ['reklam-engel'],
 permLevel: 0
};
exports.help = {
 name: 'reklam-engel'
};