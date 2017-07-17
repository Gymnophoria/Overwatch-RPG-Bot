const heroTurn = channel => {
	const game = channel.game;
	const hero = game.team.find(h => h.turnid === game.up);
	let curMessage;
	channel.turn += 1;
	
	if (hero.stunned) {
		channel.send({embed: {
			author: {
				name: `${channel.guild.members.find(hero.id).displayName}/${hero.file.info.name}`,
				icon_url: hero.file.config.icon
			},
			color: 0xff3333,
			description: 'Stunned! Turn skipped.'
		}});
		
		hero.stunned--;
		hero.turn++;
		channel.game.team[hero.id] = hero;
		
		return enemyTurn(channel);
	}
	
	channel.send({embed: {
		author: {
			name: `Your turn, ${channel.guild.members.get(hero.id).displayName}/${hero.file.info.name}`,
			icon_url: hero.file.config.icon
		},
		color: 0x7fff00,
		footer: {text: `Turn ${game.turn} | Your turn will be skipped in 45 seconds.`},
		description: `Please choose to do one of the following: ${hero.file.config.abilities.join(', ')}, or skip.\n*For more info about your abilities, type \`o.info ${hero.file.info.name}\` (Type in DMs for ease of access)*`
	}}).then(msg => {
		curMessage = msg;
	});
	
	channel.awaitMessages(m => m.author.id === hero.id && (hero.file.config.abilities.includes(m.content.toLowerCase()) || m.content.toLowerCase() === 'skip'), {max: 1, time: 45000, errors: ['time']}).then(col => {
		let msg = col.first();
		if (msg.content.toLowerCase() === 'skip') {
			curMessage.edit({embed: {
				author: {
					name: `${hero.file.info.name}, your turn was skipped.`,
					icon_url: hero.file.config.icon
				},
				color: 0xff3333,
				description: 'Your turn has been skipped. Note that you _will still be attacked_.'
			}});
		} else hero.file.attack(channel, msg.content.toLowerCase(), curMessage);
	}).catch(c => {
		curMessage.edit({embed: {
			author: {
				name: `${hero.file.info.name}, your turn was skipped.`,
				icon_url: hero.file.config.icon
			},
			color: 0xff3333,
			description: 'Your turn has been skipped because you didn\'t respond in time. RIP.'
		}});
	});
};

const enemyTurn = channel => {
	
};

const finale = channel => {
	
};

exports.heroTurn = heroTurn;
exports.enemyTurn = enemyTurn;
exports.finale = finale;