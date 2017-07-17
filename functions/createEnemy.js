module.exports = (client, type) => {
	type = type.charAt(0).toUpperCase() + type.slice(1);
	let enemy = client.enemies.get(type);
	return {
		type: enemy.info.name,
		file: enemy,
		health: enemy.config.health,
		stunned: 0,
		blocked: 0,
		open: 0
	};
};