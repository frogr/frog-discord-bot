const logOutput = require('../helpers/logOutput');
const checkRole = require('../helpers/checkRole');
const checkKickable = require('../helpers/checkKickable');
const checkBannable = require('../helpers/checkBannable');

const ping = require('./ping');
const addRole = require('./addRole');
const say = require('./say');
const deleteMsgs = require('./deleteMsgs');
const deleted = require('./deleted');
const kick = require('./kick');
const ban = require('./ban');
const squid = require('./squid');
const gay = require('./gay');

const onMessage = (client, prefix) => {
  client.on('message', async msg => {
    const logChannel = msg.guild.channels.find('name', 'logs');
    const deletedMsgs = msg.guild.channels.find('name', 'deleted');

    // check if deleted
    if (msg.deleted) {
      console.log('deleted message');
      deleted(msg);
    }

    // frog replies
    if (msg.content.includes('hi frog')) {
      msg.channel.send('hi');
    }
    if (msg.content === 'n') {
      msg.channel.send('i');
    }

    if (msg.content.startsWith(prefix)) {
      const args = msg.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
      const command = args.shift().toLowerCase();
      console.log(`command: ${command}`);
      console.log(`args: ${args}`);

      // frog.ping
      if (command === 'ping') {
        const m = await msg.channel.send('Ping?');
        ping(m, msg, command, args, client);
      }

      // frog.add {role}
      // DOESNT WORK RN PLS DONT INCLUDE
      // if (command === 'add') {
      //   addRole(msg, command, args);
      // }

      // frog.say {message}
      if (command === 'say') {
        say(msg, command, args);
      }

      // frog.squid
      if (command === 'squid') {
        squid(msg, command, args);
      }

      // frog.squid
      if (command === 'gay') {
        gay(msg, command, args);
      }

      // frog.delete {number of messages to delete}
      if (command === 'delete') {
        checkRole(msg);
        deleteMsgs(msg, command, args);
      }

      // frog.kick {user} {reason}
      if (command === 'kick') {
        let member = msg.mentions.members.first();
        checkRole(msg);
        checkKickable(msg, command, args, member);
        await kick(msg, command, args, member);
      }

      // frog.ban {user} {reason}
      if (command === 'ban') {
        let member = msg.mentions.members.first();
        checkBannable(msg, command, args, member);
        await ban(msg, command, args, member);
      }
    }
  });
};

module.exports = onMessage;
