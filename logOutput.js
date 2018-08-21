const logOutput = (msg, command, args, msgs) => {
  msg.guild.channels
    .find('name', 'logs')
    .send(
      `user ${msg.author.tag} sent the command \`${command} ${args.join(
        ' '
      )}\` in ${msg.channel}`
    );
};

module.exports = logOutput;
