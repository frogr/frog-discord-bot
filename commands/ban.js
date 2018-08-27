const logOutput = require('../helpers/logOutput');

const ban = (msg, command, args, member) => {
  member
    .ban(reason)
    .catch(error => msg.reply(`couldn't ban because of: ${error}`));
  logChannel.send(
    `${member.user.tag} has been kicked by ${
      msg.author.tag
    } for the reason: \`${reason}\``
  );
  logOutput(msg, command, args);
};

module.exports = ban;
