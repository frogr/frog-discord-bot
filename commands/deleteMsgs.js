const deleteMsgs = (msg, command, args) => {
  const deleteCount = args;
  if (!deleteCount || deleteCount < 2 || deleteCount > 100)
    return msg.reply(
      `command \`${command}\` with argument \`${args}\` is invalid. choose a number between 2 and 10`
    );
  msg.channel
    .fetchMessages({ limit: deleteCount })
    .then(msgs => msg.channel.bulkDelete(msgs))
    .then(msgs =>
      msg.guild.channels
        .find('name', 'logs')
        .send(
          `user ${msg.author.tag} sent the command \`${command} ${args.join(
            ' '
          )}\` in ${msg.channel}. this deleted ${msgs.size} messages.`
        )
    );
};

module.exports = deleteMsgs;
