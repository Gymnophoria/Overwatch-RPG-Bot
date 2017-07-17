module.exports = (client, id, type, tid) => {
	type = type.charAt(0).toUpperCase() + type.slice(1);
	let hero = client.heroes.get(type);
	return {
		id: id, // discord snowflake id
		turnid: tid, // id of turn (as to keep order)
		file: hero, // hero file
		type: hero.info.name, // Hero name
		health: hero.config.health, // current HP
		turn: 0, // current turn
		stunned: 0, // cannot participate in attack phase
		blocked: 0, // immune to attacks
		open: 0, // cannot block/deflect/dodge
		ult: hero.config.ultmax, // ult uses left
		mult: 1, // current attack multiplier, resets at end of turn
		spec1: hero.config.spec1, // special use
		spec2: hero.config.spec2, // special use
		spec3: hero.config.spec3 // special use
	};
};