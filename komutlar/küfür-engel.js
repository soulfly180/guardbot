const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
      if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.send("<a:no:813835956142473257>・**Bu Komutu** Kullanabilmek İçin **Yetkin Yok !**")
  if (!args[0]){
    message.channel.send('<a:no:813835956142473257>・**Yanlış Kullanım ! Doğru Kullanım !küfür-engel aç**')
  }
  if (args[0] === 'aç'){
    message.channel.send("<a:yes:813835795130875914>・**Küfür Engel** Başarılı Bir Şekilde Açıldı !**")
    
    db.set(`kufur_${message.guild.id}`, "acik")
  }
  if (args[0] === 'kapat'){
    message.channel.send('<a:yes:813835795130875914>・**Küfür Engel** Başarılı Bir Şekilde Kapatıldı !**')
    
    db.set(`kufur_${message.guild.id}`, "kapali")
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: "küfür-engel",
  description: "Küfür engel açar yada kapatır.",
  usage: "küfür"
}