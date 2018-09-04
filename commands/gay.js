const logOutput = require('../helpers/logOutput');

const gay = (msg, command, args) => {
  const counter = Math.floor(Math.random() * 3) + 1;
  const gayTweets = [
    'https://twitter.com/frog_js/status/1029523590226440192',
    'https://twitter.com/frog_js/status/1029141745844383745',
    'https://twitter.com/frog_js/status/1020479011317796865',
    'https://twitter.com/frog_js/status/1005860494001860608'
  ];
  msg.channel.send(gayTweets[counter]);
  logOutput(msg, command, args);
};

module.exports = gay;
