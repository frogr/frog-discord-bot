const logOutput = require('../logOutput');

const say = (msg, command, args, client) => {
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
