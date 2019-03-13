const specialSay = msg => {
  msg.delete().catch(o3o => {});
  if (msg === 'hi frog') {
    msg.channel.send('hi');
  }
  if (msg === 'n') {
    msg.channel.send('i');
  }
};

module.exports = specialSay;
