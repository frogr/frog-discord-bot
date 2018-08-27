const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
const prefix = 'frog.';

const logOutput = require('./helpers/logOutput');
const onReady = require('./onReady');
const join = require('./join');
const leave = require('./leave');
const onMessage = require('./commands/onMessage');

onReady(client, prefix); // start bot
join(client, prefix); // logs joining memebers
leave(client, prefix); // logs leaving members
onMessage(client, prefix); // message-based commands
// message-based logs go in logOutput.js

client.login(token);
