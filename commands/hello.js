const logOutput = require('../helpers/logOutput');

const hello = (msg, command, args) => {
  const helloString = 'hello';
  msg.channel.send(helloString);
  logOutput(msg, command, args);
};

module.exports = hello;
