const leave = () => {
  client.on('guildMemberRemove', member => {
    const memberLogChannel = member.guild.channels.find('name', 'member-logs');
    memberLogChannel.send(
      `${member} has left the server. they joined at ${
        member.joinedAt
      }. the server now has ${member.guild.memberCount} members.`
    );
  });
};

module.exports = leave;
