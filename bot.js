const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    `Ping Düzeltildi !`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const db = require('quick.db')
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.token); //Botun Tokenini ENV DOSYASINA Yazacaksınız !

//Komutlar 

//Küfür Engel
client.on("message", async msg => {
  
  
  let a = await db.fetch(`kufur_${msg.guild.id}`)
    if (a == 'acik') {
      const küfür = [
        "yarak","mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git","31","ananın amına yarak"
                  ]
            if (küfür.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("MANAGE_GUILD")) {
                  msg.delete();
                          
                    return msg.reply(`<a:no:813835956142473257> **Bu Sunucuda Küfür** Etmek **YASAK!**`).then(msg => msg.delete(10000));
            }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!a) return;
          })

//reklamengel

client.on("message", async message => {
  
  const lus = await db.fetch(`reklamengel_${message.guild.id}`)
  if (lus) {
    const reklamengel = ["discord.app", "discord.gg", ".party", ".com", ".az", ".net", ".io", ".gg", ".me", "https", "http", ".com.tr", ".org", ".tr", ".gl", "glicht.me/", ".rf.gd", ".biz", "www.", "www"];
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();
          
          return message.reply('<a:no:813835956142473257> **Bu Sunucuda Reklam** Yapmak **YASAK!**').then(message => message.delete(3000));
          
        }
      } catch(err) {
        console.log(err);
    }
  }
}
if (!lus) return;
});
client.on("messageUpdate", async message => {
  
  const lus = await db.fetch(`reklamengel_${message.guild.id}`)
  if (lus) {
    const reklamengel = ["discord.app", "discord.gg", ".party", ".com", ".az", ".net", ".io", ".gg", ".me", "https", "http", ".com.tr", ".org", ".tr", ".gl", "glicht.me/", ".rf.gd", ".biz", "www.", "www"];
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();
          
          return message.reply('<a:no:813835956142473257> **Bu Sunucuda Reklam** Yapmak **YASAK!**').then(message => message.delete(3000));
          
        }
      } catch(err) {
        console.log(err);
    }
  }
}
if (!lus) return;
});



//KanalKoruma

client.on("channelDelete", async function(channel) {
    let rol = await db.fetch(`kanalk_${channel.guild.id}`);
  
  if (rol) {
const guild = channel.guild.cache;
let channelp = channel.parentID;

  channel.clone().then(z => {
    let kanal = z.guild.channels.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.find(channel => channel.id === channelp)
      
    );
  });
  }
})


//Rol Koruma
client.on("roleDelete", async rol => {
var koruma = await db.fetch(`rolkoruma_${rol.guild.id}`);
if (koruma) { 
const giris = await rol.guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(denetim => denetim.entries.first());
if (giris.executor.id == client.user.id) return;
rol.guild.roles.create({ data: { 
  
color: rol.color,
name: rol.name,
hoist: rol.hoist,
permissions: rol.permissions,
position: rol.position,
mentionable: rol.mentionable
}, reason: 'Silinen Rolü Tekrardan Açtım'})
  }
})
client.on("roleCreate", async role => {
  var gamerwolf = await db.fetch(`rolkoruma_${role.guild.id}`);
  if (gamerwolf) { 
       const giris = await role.guild.fetchAuditLogs({ type: "ROLE_CREATE" }).then(denetim => denetim.entries.first());
    if (giris.executor.id == client.user.id) return;
  role.delete()
  }
})

//mod log
client.on("messageDelete", async message => {
  let a = await db.fetch(`modlog_${message.guild.id}`)
  if (a) {
    const mesajlog = new Discord.MessageEmbed()
    .setTitle('Mesaj Silindi')
    .setDescription(` **${message.author.tag}** a ait **${message.content}** adlı mesajı silindi`)
    .setTimestamp()
    .setColor("BLUE")
    client.channels.cache.get(a).send(mesajlog)
  }
})
client.on("channelDelete", async channel => {
  let a = await db.fetch(`modlog_${channel.guild.id}`)
  if (a) {
    const kanallog = new Discord.MessageEmbed()
    .setTitle('Kanal Silindi')
    .setDescription(`**${channel.name}** Adlı Kanal Silindi!`)
    .setTimestamp()
    .setColor("BLUE")
    client.channels.cache.get(a).send(kanallog)
  }
})
client.on("channelCreate", async channel => {
  let a = await db.fetch(`modlog_${channel.guild.id}`)
  if (a) {
    const kanalaçıldı = new Discord.MessageEmbed()
    .setTitle('Kanal Oluşturuldu')
    .setDescription(`**${channel.name}** Adlı Kanal Oluşturuldu!`)
    .setTimestamp()
    .setColor("BLUE")
    client.channels.cache.get(a).send(kanalaçıldı)
  }
})


//bot koruma
client.on("guildMemberAdd", member => {
  const Database = require("plasma-db");
  const db = new Database("./anti-raid.json");
  if (member.user.bot !== true) {

  } else {

    let engin = db.fetch(`botkorumalog_${member.guild.id}`)
    if(!engin) return;
    let izinli = db.fetch(`girişizni_${member.guild.id}.${member.id}`)
  if (izinli === `${member.id}`) {
    const embed = new Discord.MessageEmbed()
    .setTitle('Bir bot sunucuya girdi!')
    .setDescription(`<@${member.id}> adlı bot sunucuya girdi ve giriş izni olduğu için girmesine izin verdim!`)
    .setColor('BLUE')
    client.channels.cache.get(engin).send(embed)
    return;
  }
  member.ban(member);
  const embed = new Discord.MessageEmbed()
  .setTitle('Sunucuya bir bot girmeye çalıştı!')
  .setDescription(`<@${member.id}> Adlı bot sunucuya girmeye çalıştı ama ben anti raid sistemi açık olduğundan engelledim! \n \n Bota giriş izni vermek için: !botkoruma izin-ver ${member.id}`)
.setColor('BLUE')
  client.channels.cache.get(engin).send(embed)
};

});