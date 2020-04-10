const DISCORD = require('discord.js');
const TOKEN = require('../tokens/token');
const CLIENT = new DISCORD.Client();

GENERAL_CHANNEL = null;
MULTIPLAYER_CHANNEL = null;
DEBUG_CHANNEL = null;

CLIENT.login(TOKEN.token);

CLIENT.on("guildMemberAdd", member => {
  greetMember(member);
});

CLIENT.on('guildMemberRemove', (member) => {
  consumeMember(member);
});

function setBotPresence() {
  CLIENT.user.setStatus('available');
  CLIENT.user.setPresence({
    game: {
      name: 'over the slaves',
      type: "WATCHING",
      url: "https://github.com/Warcraft-GoA-Development-Team/Discord-Ghuun-Bot"
    }
  })
}

CLIENT.on('ready', () => { //G'huun Boot Sequence
  console.log("G'huun startup successful!");
  try {
    GENERAL_CHANNEL = CLIENT.channels.get('317370095024209920');
    DEBUG_CHANNEL = CLIENT.channels.get('606131458549219328');
    MULTIPLAYER_CHANNEL = CLIENT.channels.get('540582116832837632');
  }
  catch (exception) {
    console.log("Channel loading failed!");
    console.error(exception);
  }
});