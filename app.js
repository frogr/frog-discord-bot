const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
const prefix = 'frog.';

client.on('ready', () => {
  console.log(
    `frog bot is live and running as: ${client.user.tag} (${
      client.user.id
    }) on ${client.guilds.size} server(s)`
  );
});

client.on('message', msg => {
  if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(`command: ${command}`);
    console.log(`args: ${args}`);

    if (command === 'delete') {
      msg
        .delete()
        .then(msg =>
          console.log(`deleted "${msg.content}" from ${msg.author}`)
        );
    }
  }
});

client.login(token);
