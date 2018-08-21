const onReady = (client, prefix) => {
  client.on('ready', () => {
    console.log(
      `frog bot is live and running as: ${client.user.tag} (${
        client.user.id
      }) on ${client.guilds.size} server(s)`
    );
  });
};

module.exports = onReady;
