const logOutput = require('../helpers/logOutput');

const addRole = (m, msg, command, args) => {
  const role = args[0].replace(/[<@&>]/g, '');
  msg.member.addRole(role);
  logOutput(msg, command, args);
};

module.exports = addRole;
