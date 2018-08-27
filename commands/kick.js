const logOutput = require('../helpers/logOutput');

const kick = (msg, command, args, member) => {
  let reason = args.slice(1).join(' ');
  member
    .kick(reason)
    .catch(error => msg.reply(`couldn't kick because of: ${error}`));
  msg.guild.channels
    .find('name', 'logs')
    .send(
      `${member.user.tag} has been kicked by ${
        msg.author.tag
      } for the reason: \`${reason}\``
    );
  logOutput(msg, command, args);
};

module.exports = kick;
