const checkBannable = (msg, command, args, member) => {
  if (!msg.member.roles.some(r => ['bot god'].includes(r.name)))
    return msg.reply(
      `${
        msg.author
      } doesn't have the correct role to use the command: \`${command}\`.`
    );
  if (!member) return msg.reply('no user matches this name');
  if (!member.bannable)
    return msg.reply(
      `bot does not have proper permissions to use the command: \`${command}.\``
    );
  let reason = args.slice(1).join(' ');
  if (!reason) return msg.reply(`\`${command}.\` requires a reason argument`);
};

module.exports = checkBannable;
