'use strict';

// Import the discord.js module
const Discord = require('discord.js');
const config = require("auth.json");

// Create an instance of a Discord client
const client = new Discord.Client();

var players = new Object();

var gameStarted = false;

// Settings
var settings = new Object();
settings['numPlayers'] = 6;
settings['points'] = 10;
settings['numCommandCounters'] = 16;
settings['numStartingTacticsCounters'] = 3;
settings['numStartingFleetPoolCounters'] = 3;
settings['numStartingStrategyCounters'] = 2;
settings['numFlagship'] = 1;
settings['numWarSun'] = 2;
settings['numCruiser'] = 8;
settings['numDreadnought'] = 5;
settings['numDestroyer'] = 8;
settings['numPDS'] = 6;
settings['numCarrier'] = 4;
settings['numInfantry'] = 12;
settings['numFighter'] = 10;
settings['numSpaceDock'] = 3;
settings['acHandLimit'] = 7;
settings['maxSecretObjectives'] = 3;
settings['numStage1Public'] = 5;
settings['numStage2Public'] = 5;
settings['numStartRevealObjectives'] = 2;
settings['numObjectivesRevealPerRound'] = 1;
settings['numPublicScoreablePerStatus'] = 1;
settings['numSecretScoreablePerStatus'] = 1;
settings['numAgendasPerAgendaPhase'] = 2;
settings['commandTokenCostOfLeadershipSecondary'] = 0;
settings['commandTokenCostOfDiplomacySecondary'] = 1;
settings['commandTokenCostOfPoliticsSecondary'] = 1;
settings['commandTokenCostOfConstructionSecondary'] = 1;
settings['commandTokenCostOfTradeSecondary'] = 1;
settings['commandTokenCostOfWarfareSecondary'] = 1;
settings['commandTokenCostOfTechnologySecondary'] = 1;
settings['commandTokenCostOfImperialSecondary'] = 1;
settings['freeCommandTokensFromLeadership'] = 3;
settings['costOfCommandTokensFromLeadershipPrimary'] = 3;
settings['costOfCommandTokensFromLeadershipSecondary'] = 3;
settings['numPlanetsRefreshFromDiplomacyPrimary'] = 2;
settings['numPlanetsRefreshFromDiplomacySecondary'] = 2;
settings['numActionCardsFromPoliticsPrimary'] = 2;
settings['numAgendaCardsFromPoliticsPrimary'] = 2;
settings['numActionCardsFromPoliticsSecondary'] = 2;
settings['numTradeGoodsFromTradePrimary'] = 3;
settings['costOfFirstTechnologyFromTechnologyPrimary'] = 0;
settings['costOfSecondTechnologyFromTechnologyPrimary'] = 6;
settings['costOfTechnologyFromTechnologySecondary'] = 4;
settings['numSecretObjectivesFromImperialPrimary'] = 1;
settings['numSecretObjectivesFromImperialSecondary'] = 1;

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  if (message.content.charAt(0) === '!') {
  	if (message.content.substr(1,8) === 'settings') {
  		var settingsStr = JSON.stringify(settings, null, 1);
  		settingsStr = settingsStr.substr(1, settingsStr.length-2);
  		settingsStr = settingsStr.split('\"').join('');
  		settingsStr = settingsStr.split(',').join('');
  		message.channel.send('```' + settingsStr + '```');
  		console.log('Sent settings');
  	}
  	if (message.content.substr(1,11) === 'editSetting') {
  		var messageSplit = message.content.split(' ');
  		console.log('Editing settings');
  		if (messageSplit[1] in Object.keys(settings)) {
  			message.channel.send('```Setting not found ' + Object.keys(settings)[8] + ' ' + messageSplit[1] + '```');
  			console.log('Setting not found');
  		}
  		else if (isNaN(messageSplit[2])) {
  			message.channel.send('```Not a numeric value```');
  			console.log('Edit settings failed: non numeric value entered for setting value');
  		}
  		else if (gameStarted == true) {
  			message.channel.send('```The game has already started. Settings can\'t be changed```');
  			console.log('Edit settings failed: game started already');
  		}
  		else {
  			settings[messageSplit[1]] = Number(messageSplit[2]);
  			message.channel.send('```Changed ' + messageSplit[1] + ' to ' + messageSplit[2] + '```');
  			console.log('Edited settings');
  		}
  	}
  	if (message.content.substr(1,11) === 'listPlayers') {
  		console.log('Listing players');
  		if (Object.keys(players).length == 0) {
  			message.channel.send('```No players yet!```');
  		}
  		else {
			message.channel.send('```' + Object.keys(players).toString() + '```');
  		}
  	}
  	if (message.content.substr(1,10) === 'addPlayer') {
  		console.log('Attempting to add player');
  		if (gameStarted == true) {
  			message.channel.send('```The game has already started.```');
  			console.log('Add player failed: game started');
  		}
  		if (players.length >= settings['numPlayers']) {
  			message.channel.send('```The game is full.```');
  			console.log('Add player failed: game full');
  		}
  		else if (message.author.username in players) {
			message.channel.send('```Player ' + message.author.username + ' is already in the game.```');
			console.log('Add player failed: player already in game');
  		}
  		else {
			players[message.author.username] = message.author.id;
  			message.channel.send('```Player ' + message.author.username + ' was added to the game.```');
  			console.log('Player added to game');
  		}
  	}
  	if (message.content.substr() === 'startGame') {

  	}
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(config.token);