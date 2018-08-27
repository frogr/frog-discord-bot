const checkKickable = (msg, command, args, member) => {
  if (!member) return msg.reply('no user matches this name');
  if (!member.kickable)
    return msg.reply(
      `bot does not have proper permissions to use the command: \`${command}.\``
    );
  let reason = args.slice(1).join(' ');
  if (!reason) return msg.reply(`\`${command}.\` requires a reason argument`);
};

module.exports = checkKickable;
