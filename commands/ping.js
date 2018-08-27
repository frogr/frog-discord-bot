const logOutput = require('../helpers/logOutput');

// frog.ping
const ping = (m, msg, command, args, client) => {
  m.edit(
    `pong! latency is ${m.createdTimestamp -
      msg.createdTimestamp}ms. API latency is ${Math.round(client.ping)}ms`
  );
  logOutput(msg, command, args);
};

module.exports = ping;
