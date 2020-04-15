const MEDIA = require('./media-service.js');
const TOOLS = require('./bot-functions');

exports.processCommand = function (message) {
  var isCommand = (message.content.startsWith("g!"));

  if (isCommand) {
    interpretCommand(message);
  }
  else {
    interpretResponseCommands(message);
  }
}

function interpretResponseCommands(message) {
  var command = message.content.toLowerCase();

  var saidGhuun = (command.search("ghuun") != -1 || command.search("g'huun") != -1);
  var askedForPics = (command == "ghuun send nudes" || command == "g'huun send nudes");

  if (askedForPics) {
    sendNudes(message)
  }
  if (saidGhuun) {
    reactWithGhuun(message)
  }

  if (message.content.length == 4) {
    if (command == "soon") {
      proclaimSoon(message)
    }
    else if (command == "when") {
      askSoon(message)
    }
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
    case "rule1": speakRuleOne(message); break;
    case "rule2": speakRuleTwo(message); break;
    case "rule3": speakRuleThree(message); break;
    case "rule4": speakRuleFour(message); break;
    case "rule5": speakRuleFive(message); break;
    default: stateCommandNotFound(message);
  }
}

function stateCommandNotFound(message) {
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
  MULTIPLAYER_CHANNEL.send("Use `g!multiplayer` to join the @Multiplayer role for pings related to multiplayer games.")
  MULTIPLAYER_CHANNEL.send("Use `g!mplobby` create a multiplayer game and have it pinned to the channel. Please use this format: `g!mplobby (DAY) (dd/mm) (TIME in GMT)`.")
  MULTIPLAYER_CHANNEL.fetchMessages({ limit: 1 })
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

  MULTIPLAYER_CHANNEL.send(mplobbyMessage).then(message => {
    message.react(message.guild.emojis.get('535311429033787403'))
    message.pin();
  })
}

function rateCommand(message, strToRate) {
  var rating = TOOLS.hash(strToRate);
  rating = Math.abs(rating % 11);
  if (strToRate.toLowerCase() === "ghuun" || strToRate.toLowerCase() === "g'huun")
    rating = 10;
  message.channel.send("<:archimondethinking:540320482449293320> | **" + message.member.displayName + "**, Il'zarq G'huun phgwa an'zig. I'd give" + strToRate + " a **" + rating + "/10**.");
}

function sendNudes(message) {
  var randomToken = TOOLS.getRandomInt(6);

  switch (randomToken) {
    case 0: message.channel.send(MEDIA.ghuun1); break;
    case 1: message.channel.send(MEDIA.ghuun2); break;
    case 2: message.channel.send(MEDIA.ghuun3); break;
    case 3: message.channel.send(MEDIA.ghuun4); break;
    case 4: message.channel.send(MEDIA.ghuun5); break;
    default: message.channel.send(MEDIA.ghuun6); break;
  }
}

function reactWithGhuun(message) {
  message.react(message.guild.emojis.get('535311429033787403'))
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

function speakRuleOne(message) {
  message.channel.send("Rule 1: Don't be a dick.");
  message.delete();
}

function speakRuleTwo(message) {
  message.channel.send("Rule 2: Targeted harassment of others and general spaminess is not tolerated.");
  message.delete();
}

function speakRuleThree(message) {
  message.channel.send("Rule 3: Keep NSFW stuff in #toxic-lounge.");
  message.delete();
}

function speakRuleFour(message) {
  message.channel.send("Rule 4: Scenes of zoophilia, necrophilia, death, child porn, disfigurement, and guro are completely prohibited.");
  message.delete();
}

function speakRuleFive(message) {
  message.channel.send("Rule 5: Don't go breaking the Discord ToS.");
  message.delete();
}