const logOutput = require('../logOutput');

const addRole = (m, msg, command, args, client) => {
  const role = args[0].replace(/[<@&>]/g, '');
  msg.member.addRole(role);
  logOutput(msg, command, args);
};

module.exports = addRole;
