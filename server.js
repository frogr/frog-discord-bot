const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;

client.on('ready', () => {
  console.log('bot running');
});

client.on('message', message => {
  if (message.content === 'shika sucks') {
    message.channel.send('yep he sure does lol');
  }
});

client.login(token);
