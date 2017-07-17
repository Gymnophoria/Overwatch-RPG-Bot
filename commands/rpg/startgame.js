const { Collection } = require('discord.js');
const newChar = require(`${__dirname}/../../functions/createCharacter.js`);
const newEnem = require(`${__dirname}/../../functions/createEnemy.js`);
const game = require(`${__dirname}/../../functions/game.js`);

// Fisher-Yates Shuffle, I take no credit for it.
function shuffle(array) {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function arrayAm(num) {
	let a = [];
	for (let i = 1; i <= num; i++) {
		a.push(i);
	}
	return a;
}

exports.run = (message, args, suffix, client, perms) => {
	if (!message.channel.name.toLowerCase().includes('rpg') && perms < 3) return message.channel.send('You do not have permission to start a game here.');
	if (!args[0] || !client.enemies.keyArray().map(e => e.toLowerCase()).includes(args[0].toLowerCase())) return message.channel.send('Please choose a valid enemy to fight against. Current options are `' + client.enemies.keyArray().join(', ') + '`');
	
	message.channel.send({embed: {
		author: {
			name: 'Overwatch RPG has been started.'
		},
		color: 0xFAA02E,
		description: `A game of Overwatch RPG has been initialized. You will be playing against ${args[0].charAt(0).toUpperCase() + args[0].slice(1)}, and your team${message.mentions.users.first() ? 'mates will be' : ' will be just you,'} ${message.author.toString()}${message.mentions.users.first() ? ', ' + message.mentions.users.map(u => u.toString()).join(', ') : ''}.\n\nAll teammates, please choose a hero to play as. Current options are ${client.heroes.keyArray().join(', ')}. Simply type the heroes name in chat.`,
		footer: {text: 'You have 30 seconds to choose a hero. If none is chosen, game will be canceled.'}
	}});
	 // SHOULD BE 5 CHARACTERS, STRICT, just keeping at w/e because testing
	 // also disallow bots to join, keep bc testing is needed with marvin lol
	let team = new Collection();
	let userTeam = message.mentions.users;
	userTeam.set(message.author.id, message.author);
	let timeUp = false;
	let maxSize = userTeam.size;
	let curSize = 0;
	let turnArr = shuffle(arrayAm(maxSize));
	
	membersFinished();
	userTeam.forEach(u => {
		message.channel.awaitMessages(m => m.author.id === u.id && client.heroes.keyArray().map(h => h.toLowerCase()).includes(m.content.toLowerCase()), { max: 1, time: 30000, errors: ['time']}).then(col => {
			let uHero = col.first().content.charAt(0).toUpperCase() + col.first().content.slice(1);
			team.set(u.id, newChar(client, u.id, uHero, turnArr[curSize])); 
			message.channel.send(`:white_check_mark: | Your hero has been set to ${uHero}`);
			curSize++;
		}).catch(c => timeUp = true);
	});
	
	function membersFinished() {
		if (maxSize != curSize && !timeUp) { // maxSize to be 5
			setTimeout(membersFinished, 1000);
			return;
		}
		if (timeUp) return message.channel.send('Not everyone responded in time - game canceled.');
		message.channel.game = {
			playing: true,
			team: team,
			enemy: newEnem(client, args[0]),
			turn: 1,
			order: turnArr,
			up: turnArr[0]
		};
		game.heroTurn(message.channel);
	}
};

exports.config = {
	enabled: true,
	permLevel: 2,
	aliases: ['sg']
};

exports.help = {
	name: 'Start Game',
	description: 'Start an RPG game in the current channel.',
	usage: 'startgame <enemy> <mentions>',
	help: 'Start an RPG game in the current channel. Anyone can do this in channels with `RPG` in their name, person must have RPG role or higher to start in other channels.',
	category: 'RPG'
};