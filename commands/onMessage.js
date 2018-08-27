const logOutput = require('../helpers/logOutput');
const checkRole = require('../helpers/checkRole');
const checkKickable = require('../helpers/checkKickable');
const checkBannable = require('../helpers/checkBannable');

const ping = require('./ping');
const addRole = require('./addRole');
const say = require('./say');
const deleteMsgs = require('./deleteMsgs');

const onMessage = (client, prefix) => {
  client.on('message', async msg => {
    const logChannel = msg.guild.channels.find('name', 'logs');
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
      if (command === 'add') {
        addRole(msg, command, args);
      }

      // frog.say {message}
      if (command === 'say') {
        say(msg, command, args);
      }

      // frog.delete {number of messages to delete}
      if (command === 'delete') {
        checkRole(msg);
        delete (msg, command, args);
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
