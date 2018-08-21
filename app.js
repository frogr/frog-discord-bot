const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
const prefix = 'frog.';

const logOutput = require('./logOutput');
const onReady = require('./onReady');
const join = require('./join');
const leave = require('./leave');
const onMessage = require('./onMessage');

onReady(client, prefix);
join(client, prefix);
leave(client, prefix);
onMessage(client, prefix);

client.login(token);
