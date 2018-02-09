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

client.on('message', async msg => {
  if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(`command: ${command}`);
    console.log(`args: ${args}`);

    if (command === 'delete') {
      const deleteCount = args;
      if (!deleteCount || deleteCount < 2 || deleteCount > 100)
        return msg.reply(
          `command \`${command}\` with argument \`${args}\` is invalid. choose a number between 2 and 10`
        );
      msg.channel
        .fetchMessages({ limit: deleteCount })
        .then(msgs => msg.channel.bulkDelete(msgs));
    }
  }
});

client.login(token);

// comment hell
// msg
//   .delete()
//   .then(msg =>
//     console.log(
//       `deleted "${msg.content}" from ${msg.author} at ${msg.createdAt}. `
//     )
//   );
// if (!deleteCount || deleteCount < 2 || deleteCount > 100)
//   return msg.reply(
//     'Please provide a number between 2 and 100 for the number of messages to delete'
//   );
// const fetched = await msg.channel.fetchMessages({
//   count: deleteCount
// });
