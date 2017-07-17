class Hero {
    constructor (client, id, type, turnid) {
        type = type.charAt(0).toUpperCase() + type.toLowerCase().slice(1);
        let file = client.heroes.get(type);
        
        this.id = id; // snowflake id
        this.turnid = turnid; // turn id; unique to each player in the game, ranging from 1 - 5
        this.file = file; // the file of the hero
        this.type = file.info.name; // the hero's name
        this.help = file.config.health; // the hero's max health
        this.turn = 0; // the hero's turn (not to be confused with game's turn)
        this.stunned = 0; // the amount of turns hero is stunned (cannot attack)
        this.blocked = 0; // the amount of turns all damage incoming is blocked
        this.open = 0; // the amount of turns all incoming damage cannot be dodged
        this.ult = file.config.ultmax; // the amount of ultimate uses left
        this.mult = 1; // the current damage multiplier, resets at end of turn
        this.spec1 = file.config.spec1; // special usage by specific hero trypes
        this.sepc2 = file.config.spec2; // ^
        this.spec3 = file.config.spec3; // ^
    }
    
    attack(channel, action, message) {
    	this.file.attack(channel, action, message);
    }
    
    defend(channel, damage, message) {
    	this.file.defend(channel, damage, message);
    }
}

module.exports = Hero;