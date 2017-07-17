exports.run = (message, args, suffix, client) => {
	let lowH = client.heroes.keyArray().map(h => h.toLowerCase());
	let lowE = client.enemies.keyArray().map(e => e.toLowerCase());
	
	if (!args[0]) return message.channel.send(`Please choose a character to view. Current heroes are ${client.heroes.keyArray().join(', ')}, and the current enemies are ${client.enemies.keyArray().join(', ')}.`);
	if (!lowH.includes(args[0].toLowerCase()) && !lowE.includes(args[0].toLowerCase())) return message.channel.send(`\`${args[0]}\` is not a valid character. Current heroes are ${client.heroes.keyArray().join(', ')}, and the current enemies are ${client.enemies.keyArray().join(', ')}.`);
	
	let firstCap = args[0].charAt(0).toUpperCase() + args[0].slice(1);
	let character = client.heroes.get(firstCap) 
	let enemy = client.enemies.get(firstCap);
	
	if (character) message.channel.send({embed: {
		footer: {text: 'Protip: You can use this command in DMs'},
		author: {
			name: 'Hero: ' + character.info.name,
			icon_url: character.config.icon
		},
		color: character.config.color,
		fields: [
			{
				name: 'Skills',
				value: character.info.skills,
				inline: true
			},
			{
				name: 'Passives',
				value: character.info.passives,
				inline: true
			},
			{
				name: 'Ultimate',
				value: character.info.ultimate,
				inline: true
			}
		]
	}});
	else message.channel.send({embed: {
		footer: {text: 'Protip: You can use this command in DMs'},
		author: {
			name: 'Enemy: ' + enemy.info.name,
			icon_url: enemy.config.icon
		},
		color: enemy.config.color,
		fields: [
			{
				name: 'Information',
				value: enemy.info.info
			}
		]
	}});
};

exports.config = {
	enabled: true,
	permLevel: 1,
	aliases: []
};

exports.help = {
	name: 'Info',
	description: 'Get information about a character\'s stats in this RPG.',
	usage: 'info <character>',
	help: 'Get information about a character\'s stats in this RPG.',
	category: 'RPG'
};