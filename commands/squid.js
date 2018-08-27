const logOutput = require('../helpers/logOutput');

const squid = (msg, command, args) => {
  const squidString = 'くコ:彡･ﾟﾟ･｡';
  msg.channel.send(squidString);
  logOutput(msg, command, args);
};

module.exports = squid;
