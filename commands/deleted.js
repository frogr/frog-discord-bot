const deleted = msg => {
  msg.guild.channels
    .find('name', 'deleted')
    .send(`user ${msg.author.tag} deleted the following in ${msg.channel}`)
    .send(msg);
};

module.exports = deleted;
