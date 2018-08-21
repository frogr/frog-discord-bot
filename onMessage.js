const logOutput = require('./logOutput');

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
      ////
      if (command === 'ping') {
        const m = await msg.channel.send('Ping?');
        m.edit(
          `pong! latency is ${m.createdTimestamp -
            msg.createdTimestamp}ms. API latency is ${Math.round(
            client.ping
          )}ms`
        );
        logOutput(msg, command, args);
      }
      ////
      if (command === 'add') {
        const role = args[0].replace(/[<@&>]/g, '');
        msg.member.addRole(role);
        logOutput(msg, command, args);
      }
      ////
      if (command === 'say') {
        const sayMessage = args.join(' ');
        msg.delete().catch(o3o => {});
        msg.channel.send(sayMessage);
        logOutput(msg, command, args);
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
          !msg.member.roles.some(r =>
            ['big frog', 'Moderator'].includes(r.name)
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
