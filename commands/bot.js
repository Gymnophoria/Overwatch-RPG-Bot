const Discord = require('discord.js');

exports.run = (message, args, asdf, client) => {
	message.channel.send({embed: {
		title: 'Overwatch RPG bot, i need a name',
		description: `An Overwatch RPG bot.`,
		color: 0x00c140,
		fields: [
			{
				name: 'Authors',
				value: 'RPG by Dizian#7668 (#1328 OW) Bot created by Gymnophoria#8146 (no ow bc bad)'
			},
			{
				name: 'Help',
				value: '@Arthur help',
				inline: true
			},
			{
				name: 'More Info',
				value: 'All ideas inspired from [this doc](https://docs.google.com/document/d/1Ttbv477BtTkLPt_6A-QX8jVMdl83QdHNugn6h0f4BR4/edit?usp=sharing)',
				inline: true
			},
			{
				name: 'Info',
				value: `Language: Javascript. Node: \`${process.version}\`. Discord.JS: \`v${Discord.version}\``
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
	description: 'View information about this bot.',
	usage: 'info',
	help: 'It\'s really just info about the bot.',
	category: 'Other'
};