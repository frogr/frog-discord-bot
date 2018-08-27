const logOutput = require('../helpers/logOutput');

const say = (msg, command, args) => {
  if (
    command.includes('@everyone') ||
    command.includes('@here') ||
    args.includes('@everyone') ||
    command.includes('@here')
  ) {
    msg.channel.send('no');
  } else {
    const sayMessage = args.join(' ');
    msg.delete().catch(o3o => {});
    msg.channel.send(sayMessage);
    logOutput(msg, command, args);
  }
};

module.exports = say;
