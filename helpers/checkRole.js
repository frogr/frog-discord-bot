const checkRole = () => {
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
};

module.exports = checkRole;
