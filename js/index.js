const DISCORD = require('discord.js');
const TOKEN = require('../tokens/token');
const CLIENT = new DISCORD.Client();

CLIENT.login(TOKEN.token);

CLIENT.on('ready', () => { //G'huun Boot Sequence
  console.log("G'huun startup successful!");
});