module.exports = client => {
	client.permLevel = message => {
		let permLevel = 2;
		
		if (client.config.owners.includes(message.author.id)) return 10;
		if (!message.author) return 0;
		if (!message.guild) return 1;
		
		try {
			let rpg = message.guild.roles.find(r => r.name.toLowerCase().includes('rpg'));
			let admin = message.guild.roles.find(r => r.name.toLowerCase().includes('admin'));
			if (rpg && message.member.roles.has(rpg)) permLevel = 3;
			if (admin && message.member.roles.has(admin)) permLevel = 4;
		} catch (e) {
			permLevel;
		}
		
		if (message.member.permissions.has('MANAGE_GUILD')) permLevel = 4;
		if (message.author.id === message.guild.ownerID) permLevel = 4;
		
		return permLevel;
		
		/*
		0 - not a person (webhook/pinned message)
		1 - in a DM
		2 - regular guild member
		3 - has RPG role
		4 - has admin perms
		10 - bot owner
		*/
	};
};