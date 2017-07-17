class Enemy {
	constructor (client, type) {
		type = type.charAt(0).toUpperCase() + type.toLowerCase().slice(1);
		let enemy = client.enemies.get(type);
		
		this.type = enemy.info.name; // name of enemy
		this.file = enemy; // enemy's file
		this.health = enemy.config.health; // enemy's current health
		this.stunned = 0; // amount of turns stunned (can't attack)
		this.blocked = 0; // amount of turns blocked (can't take damage)
		this.open = 0; // amount of turns open (can't dodge attacks)
	}
	
	attack(channel, action, message, victim) {
    	this.file.attack(channel, action, message, victim);
    }
    
    defend(channel, damage, message) {
    	this.file.defend(channel, damage, message);
    }
}

module.exports = Enemy;