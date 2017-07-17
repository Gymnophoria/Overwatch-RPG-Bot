exports.attack = (channel, action, message) => {
	
};

exports.defend = (channel, action) => {
	
};

exports.info = {
	name: 'Mercy',
	skills: 'Heal - Heal a set target for exactly 100 HP. (Cannot heal self)\nBoost - Damage boost a player for one turn.\nShoot - Shoot the enemy 3 times, 1/3 chance that all hits are headshots.',
	passives: '**Guardian Angel** - A hit that would normally kill her brings her down to 1 HP (once per game).\n**Heaven\'s Light** - Every 5 attack phases, Mercy has a 1/3 chance to regenerate 100 HP.\n**Basic Dodge** - Mercy has a 1/5 chance of evading an enemy attack.',
	ultimate: '**Resurrection** - During her turn, Mercy can resurrect 1 person to full HP or 2 people to half HP. They will be immune to attacks for the next attack phase. Once per game.'
};

exports.config = {
	abilities: ['heal', 'boost', 'shoot', 'ult'],
	health: 200,
	icon: 'https://vignette4.wikia.nocookie.net/overwatch/images/8/81/Mercy_Spray_-_Icon.png',
	ultmax: 1,
	color: 0xffffff,
	spec1: 1 // guardian angel passive uses left
};