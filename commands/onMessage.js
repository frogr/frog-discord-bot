const logOutput = require('../helpers/logOutput');
const checkRole = require('../helpers/checkRole');

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
        addRole(msg, command, args, client);
      }

      // frog.say {message}
      if (command === 'say') {
        say(msg, command, args, client);
      }

      // frog.delete {number of messages to delete}
      if (command === 'delete') {
        checkRole(msg);
        delete (msg, command, args, client);
      }

      // frog.kick {user} {reason}
      if (command === 'kick') {
        if (
          !msg.member.roles.some(r =>
            ['big frog', 'Moderator', 'bot god'].includes(r.name)
          )
        )
          return msg.reply(
            `${
              msg.author
            } doesn't have the correct role to use the command: \`${command}.\``
          );
        let member = msg.mentions.members.first();
        if (!member) return msg.reply('no user matches this name');
        if (!member.kickable)
          return msg.reply(
            `bot does not have proper permissions to use the command: \`${command}.\``
          );
        let reason = args.slice(1).join(' ');
        if (!reason)
          return msg.reply(`\`${command}.\` requires a reason argument`);
        await member
          .kick(reason)
          .catch(error => msg.reply(`couldn't kick because of: ${error}`));
        logChannel.send(
          `${member.user.tag} has been kicked by ${
            msg.author.tag
          } for the reason: \`${reason}\``
        );
        logOutput(msg, command, args);
      }

      // frog.ban {user} {reason}
      if (command === 'ban') {
        if (!msg.member.roles.some(r => ['big frog, bot god'].includes(r.name)))
          return msg.reply(
            `${
              msg.author
            } doesn't have the correct role to use the command: \`${command}.\``
          );
        let member = msg.mentions.members.first();
        if (!member) return msg.reply('no user matches this name');
        if (!member.bannable)
          return msg.reply(
            `bot does not have proper permissions to use the command: \`${command}.\``
          );
        let reason = args.slice(1).join(' ');
        if (!reason)
          return msg.reply(`\`${command}.\` requires a reason argument`);
        await member
          .ban(reason)
          .catch(error => msg.reply(`couldn't ban because of: ${error}`));
        logChannel.send(
          `${member.user.tag} has been kicked by ${
            msg.author.tag
          } for the reason: \`${reason}\``
        );
        logOutput(msg, command, args);
      }
    }
  });
};

module.exports = onMessage;
