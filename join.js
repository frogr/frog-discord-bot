const join = () => {
  client.on('guildMemberAdd', member => {
    const memberLogChannel = member.guild.channels.find('name', 'member-logs');
    memberLogChannel.send(
      `${member} has joined the server. they joined at ${
        member.joinedAt
      }. the server now has ${member.guild.memberCount} members.`
    );
  });
};

module.exports = join;
