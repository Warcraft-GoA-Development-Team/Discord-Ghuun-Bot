const DISCORD = require('discord.js');
const UTILITIES = require('./utility.js');
const TOKEN = require('../tokens/token');
const MEDIA = require('./media-service.js');
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

CLIENT.on('message', (message) => { //Command Listener
  processCommand(message);
});

function consumeMember(member) {
  GENERAL_CHANNEL.send(`*consumes the soul of ${member.displayName}*`)
}

function greetMember(member) {
  guild = member.guild;

  var randomToken = UTILITIES.getRandomInt(5);
  DEBUG_CHANNEL.send("Greeted a new user with token " + randomToken);

  switch (randomToken) {
    case 0: GENERAL_CHANNEL.send(`<:tortle:604685683285819402> A new turtle, ${member.user}, has made it to the Discord! <:tortle:604685683285819402>`);
      GENERAL_CHANNEL.send(MEDIA.turtleVideo); break;
    case 1: GENERAL_CHANNEL.send(`${member.user}, gul'kafh an'shel. Yoq'al shn ky ag nuul. Ag puul skshgn: on'ma yeh'glu zuq.`)
      GENERAL_CHANNEL.send(MEDIA.wellMet); break;
    case 2: GENERAL_CHANNEL.send(`${member.user}, gul'kafh an'shel. Yoq'al shn ky ag nuul. Ag puul skshgn: on'ma yeh'glu zuq. Another one :point_up: has made it to the Discord.`)
      GENERAL_CHANNEL.send(MEDIA.khalid); break;
    case 3: GENERAL_CHANNEL.send(`${member.user}, gul'kafh an'shel. Yoq'al shn ky ag nuul. Ag puul skshgn: on'ma yeh'glu zuq.`)
      GENERAL_CHANNEL.send(MEDIA.knightVideo); break;
    default: GENERAL_CHANNEL.send(`<:whip:562757939765575705> ${member.user}, gul'kafh an'shel. Yoq'al shn ky ag nuul. <:whip:562757939765575705>`)
      GENERAL_CHANNEL.send(MEDIA.whip); break;
  }
}

function processCommand(message) {
  console.log("here");
  var saidSoon = (message.content.toLowerCase().search("soon") != -1 && message.content.length == 4);
  var saidWhen = (message.content.toLowerCase().search("when") != -1 && message.content.length == 4);
  var saidGhuun = (message.content.toLowerCase().search("ghuun") != -1 || message.content.toLowerCase().search("g'huun") != -1);
  var askedForPics = (message.content.toLowerCase() == "ghuun send nudes" || message.content.toLowerCase() == "g'huun send nudes");
  var isCommand = (message.content.startsWith("g!"));

  if (message.author == CLIENT.user) {
    return;
  }
  if (askedForPics) {
    sendNudes(message)
  }
  if (saidGhuun) {
    reactWithGhuun(message)
  }
  if (saidSoon) {
    proclaimSoon(message)
  }
  else if (saidWhen) {
    askSoon(message)
  }
  if (isCommand) {
    interpretCommand(message)
  }
}

function interpretCommand(message) {

  var command = message.content.substr(2)
  var commandPieces = command.split(" ")
  var mainCommand = commandPieces[0]
  var arguments = commandPieces.slice(1)

  switch (mainCommand) {
    case "ping": helpCommand(message); break;
    case "emoji": emojiCommand(message); break;
    case "multiplayer": multiplayerCommand(message); break;
    case "mphelp": multiplayerHelp(message); break;
    case "mplobby": lobbyCommand(message, arguments); break;
    case "gayforghuun": speakCommand(message, message.content.substring(13)); break;
    case "rate": rateCommand(message, message.content.substring(6)); break;
    case "rule1": ruleOne(message); break;
    case "rule2": ruleTwo(message); break;
    case "rule3": ruleThree(message); break;
    case "rule4": ruleFour(message); break;
    case "rule5": ruleFive(message); break;
    default: commandError(message);
  }
}

function commandError(message) {
  message.channel.send("Command not recognized.");
}

function helpCommand(message) {
  message.reply("Pong!");
}

function emojiCommand(message) {
  message.reply("<:ghuun:535311429033787403>");
}

function multiplayerHelp(message) {
  console.log(message.member.displayName + " has used g!mphelp");
  multiplayerChannel.send("Use `g!multiplayer` to join the @Multiplayer role for pings related to multiplayer games.")
  multiplayerChannel.send("Use `g!mplobby` create a multiplayer game and have it pinned to the channel. Please use this format: `g!mplobby (DAY) (dd/mm) (TIME in GMT)`.")
  multiplayerChannel.fetchMessages({ limit: 1 })
}

function multiplayerCommand(message) {
  if (!message.member.roles.has('541061831045677095')) {
    message.reply("you have been added to @Multiplayer! Za awtgsshu wgah uulg'ma ywaq zaix. :game_die:");
    message.member.addRole('541061831045677095');
    console.log(message.member.displayName + " was added to @Multiplayer.");
  }
  else {
    message.reply("you have been removed from @Multiplayer! Za awtgsshu wgah uulg'ma ywaq zaix. :game_die: :gun:");
    message.member.removeRole('541061831045677095');
    console.log(message.member.displayName + " was removed from @Multiplayer.");
  }
}

function lobbyCommand(message, arguments) {
  console.log(message.member.displayName + " has used g!mplobby")

  var mplobbyMessage = ":game_die: <@&541061831045677095>, " + message.member.displayName + " has scheduled a game for " + arguments[0] + ", " + arguments[1] + " at " + arguments[2] + " GMT. React with <:ghuun:535311429033787403> if you plan to join. :game_die:";

  multiplayerChannel.send(mplobbyMessage).then(message => {
    message.react(message.guild.emojis.resolve('535311429033787403'))
    message.pin();
  })
}

function rateCommand(message, strToRate) {
  var rating = hash(strToRate);
  rating = Math.abs(rating % 11);
  if (strToRate.toLowerCase() === "ghuun" || strToRate.toLowerCase() === "g'huun")
    rating = 10;
  message.channel.send("<:archimondethinking:540320482449293320> | **" + message.member.displayName + "**, Il'zarq G'huun phgwa an'zig. I'd give" + strToRate + " a **" + rating + "/10**.");
}

function sendNudes(message) {
  var randomToken = UTILITIES.getRandomInt(6);

  switch (randomToken) {
    case 0: message.channel.send(MEDIA.ghuun1); break;
    case 1: message.channel.send(MEDIA.ghuun2); break;
    case 2: message.channel.send(MEDIA.ghuun3); break;
    case 3: message.channel.send(MEDIA.ghuun4); break;
    case 4: message.channel.send(MEDIA.ghuun5); break;
    default: message.channel.send(MEDIA.ghuun6); break;
  }
  console.log("send nude");
}

function reactWithGhuun(message) {
  message.react(message.guild.emojis.resolve('535311429033787403'))
}

function proclaimSoon(message) {
  message.reply("SOOOOOOOOOON!")
}

function askSoon(message) {
  message.reply(" 'kadiq \"soon\"")
}

function speakCommand(message, substring) {
  message.channel.send(substring);
  DEBUG_CHANNEL.send(message.member.displayName + " told G'huun to say \"" +
    substring + "\".");
  message.delete();
}

function ruleOne(message) {
  message.channel.send("Rule 1: Don't be a dick.");
  message.delete();
}

function ruleTwo(message) {
  message.channel.send("Rule 2: Targeted harassment of others and general spaminess is not tolerated.");
  message.delete();
}

function ruleThree(message) {
  message.channel.send("Rule 3: Keep NSFW stuff in #toxic-lounge.");
  message.delete();
}

function ruleFour(message) {
  message.channel.send("Rule 4: Scenes of zoophilia, necrophilia, death, child porn, disfigurement, and guro are completely prohibited.");
  message.delete();
}

function ruleFive(message) {
  message.channel.send("Rule 5: Don't go breaking the Discord ToS.");
  message.delete();
}

function hash(strToHash) {
  var hash = 0;
  if (strToHash.length == 0) {
    return hash;
  }
  for (var i = 0; i < strToHash.length; i++) {
    var char = strToHash.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

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
  try {
    GENERAL_CHANNEL = CLIENT.channels.resolve('317370095024209920');
    DEBUG_CHANNEL = CLIENT.channels.resolve('606131458549219328');
    MULTIPLAYER_CHANNEL = CLIENT.channels.resolve('540582116832837632');
  }
  catch (exception) {
    console.log("Channel loading failed!");
    console.error(exception);
  }
  console.log("G'huun startup successful!");
});