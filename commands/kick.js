const logOutput = require('../helpers/logOutput');

const kick = (msg, command, args, member) => {
  member
    .kick(reason)
    .catch(error => msg.reply(`couldn't kick because of: ${error}`));
  logChannel.send(
    `${member.user.tag} has been kicked by ${
      msg.author.tag
    } for the reason: \`${reason}\``
  );
  logOutput(msg, command, args);
};

module.exports = kick;
