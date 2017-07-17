const Discord = require('discord.js');
const client = new Discord.Client({
    fetchAllMembers: true,
    disabledEvents: ['TYPING_START']
});

client.config = require('../media/config.json');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.heroes = new Discord.Collection();
client.enemies = new Discord.Collection();

require('./util/commandLoader.js')(client);
require('./util/characterLoader.js')(client);
require('./util/eventLoader.js')(client);
require('./functions/permLevel.js')(client);
require('./functions/findMember.js')(client);

client.login(client.config.token);