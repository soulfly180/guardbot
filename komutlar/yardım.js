const discord = require('discord.js');
exports.run = async(client, message, args) => {
    const embed = new discord.MessageEmbed()
    .setTitle('SoulFly Guard Bot Yardım Menüsü !')
    .addField('!ban', 'Kullanıcıyı Sunucudan Yasaklarsınız', true)
    .addField('!kanal-koruma', 'Kullanıcıların kanal Açmasını Engeller', true)
    .addField('!küfür-engel', 'Kullanıcıların Küfür Etmesini Engeller', true)
    .addField('!ping', 'Botun Gecikme Süresini Gösterir', true)
    .addField('!reklam-engel', 'Kullanıcıların Reklam Yapmasını Engeller', true)
    .addField('!unban', 'Yasaklı Kullanıcının Yasağını Kaldırır', true)

message.channel.send(embed)
};
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ['help']



};
exports.help = {
name: "yardım"
};