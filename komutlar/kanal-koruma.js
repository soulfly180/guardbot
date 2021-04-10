const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {
let prefix = ayarlar.prefix 
  if (!args[0]) {
    const yanlış = new Discord.MessageEmbed()
    .setDescription(`<a:no:813835956142473257>・**Yanlış Kullanım ! Doğru Kullanım !kanal-koruma aç**`)
    .setTimestamp()
    .setColor("BLUE")
    return message.channel.send(yanlış)
  }
  if (args[0] === 'aç') {
    db.set(`kanalk_${message.guild.id}`, "Aktif")
       const aç = new Discord.MessageEmbed()
    .setDescription(`<a:yes:813835795130875914>・**Kanal Koruma** Başarılı Bir Şekilde **Açıldı !**`)
    .setTimestamp()
    .setColor("BLUE")
    return message.channel.send(aç)
  }
   if (args[0] === 'kapat') {
    db.delete(`kanalk_${message.guild.id}`)
       const kapat = new Discord.MessageEmbed()
    .setDescription(`<a:yes:813835795130875914>・**Kanal Koruma** Başarılı Bir Şekilde **Kapatıldı !**`)
    .setTimestamp()
    .setColor("BLUE")
    return message.channel.send(kapat)
  }
};
exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'kanal-koruma'
}; 
