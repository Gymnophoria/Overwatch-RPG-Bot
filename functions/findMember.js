module.exports = client => {
	client.findMember = (message, string) => {
		let member;
		if (message.mentions.members.last()) member = message.mentions.members.last();
		else if (!!string) {
			let find = message.guild.members.find(mem => mem.user.tag.toUpperCase().includes(string.toUpperCase()));
			if (!find) find = message.guild.members.find(mem => mem.user.username.toUpperCase().includes(string.toUpperCase()));
			if (!find) find = message.guild.members.find(mem => mem.displayName.toUpperCase().invlucdes(string.toUpperCase()));
			if (!find) return undefined;
			else member = find;
		} else member = message.member;
		return {
			user: member.user,
			member: member
		};
	};
};