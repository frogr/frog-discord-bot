const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
const prefix = 'frog.';

client.on('ready', () => {
  console.log(
    `frog bot is live and running as: ${client.user.tag} (${
      client.user.id
    }) on ${client.guilds.size} server(s)`
  );
});

client.on('guildMemberAdd', member => {
  const memberLogChannel = member.guild.channels.find('name', 'member-logs');
  memberLogChannel.send(
    `${member} has joined the server. they joined at ${
      member.joinedAt
    }. the server now has ${member.guild.memberCount} members.`
  );
});
client.on('guildMemberRemove', member => {
  const memberLogChannel = member.guild.channels.find('name', 'member-logs');
  memberLogChannel.send(
    `${member} has left the server. they joined at ${
      member.joinedAt
    }. the server now has ${member.guild.memberCount} members.`
  );
});

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
    ////
    if (command === 'add') {
      const role = args[0].replace(/[<@&>]/g, '');
      msg.member.addRole(role);
      logChannel.send(
        `user ${msg.author.tag} sent the command \`${command} ${args.join(
          ' '
        )}\` in ${msg.channel}`
      );
    }
    ////
    if (command === 'say') {
      const sayMessage = args.join(' ');
      msg.delete().catch(o3o => {});
      msg.channel.send(sayMessage);
      logChannel.send(
        `user ${msg.author.tag} sent the command \`${command} ${args.join(
          ' '
        )}\` in ${msg.channel}`
      );
    }
    ////
    if (command === 'delete') {
      const deleteCount = args;
      if (!deleteCount || deleteCount < 2 || deleteCount > 100)
        return msg.reply(
          `command \`${command}\` with argument \`${args}\` is invalid. choose a number between 2 and 10`
        );
      msg.channel
        .fetchMessages({ limit: deleteCount })
        .then(msgs => msg.channel.bulkDelete(msgs))
        .then(msgs =>
          logChannel.send(
            `user ${msg.author.tag} sent the command \`${command} ${args.join(
              ' '
            )}\` in ${msg.channel}. this deleted ${msgs.size} messages.`
          )
        );
    }
    ////
    if (command === 'kick') {
      if (
        !msg.member.roles.some(r => ['big frog', 'Moderator'].includes(r.name))
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
        `user ${msg.author.tag} sent the command \`${command} ${args.join(
          ' '
        )}\` in ${msg.channel}.`
      );
      logChannel.send(
        `${member.user.tag} has been kicked by ${
          msg.author.tag
        } for the reason: \`${reason}\``
      );
    }
    ////
    if (command === 'ban') {
      if (!msg.member.roles.some(r => ['big frog'].includes(r.name)))
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
        `user ${msg.author.tag} sent the command \`${command} ${args.join(
          ' '
        )}\` in ${msg.channel}.`
      );
      logChannel.send(
        `${member.user.tag} has been kicked by ${
          msg.author.tag
        } for the reason: \`${reason}\``
      );
    }
  }
});

client.login(token);
