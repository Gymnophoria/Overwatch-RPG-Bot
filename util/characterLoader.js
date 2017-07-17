const fs = require('fs');

const loadChar = (path, client, type, singular) => {
	console.log(`Loading ${singular} ${path} :ow or something:`);
	let file = require(`${__dirname}/../${type}/${path}`);
	client[type].set(path.replace(/.js/g, ''), file);
};

module.exports = client => {
	console.log('Loading OW Assets');
	
	const heroes = fs.readdirSync(`${__dirname}/../heroes`);
	const enemies = fs.readdirSync(`${__dirname}/../enemies`);
	
	heroes.forEach(h => {
		try {
			loadChar(h, client, 'heroes', 'hero');
		} catch (err) {
			console.error(`Error loading hero ${h}:\n${err.stack ? err.stack : err}`);
		}
	});
	
	enemies.forEach(e => {
		try {
			loadChar(e, client, 'enemies', 'enemy');
		} catch (err) {
			console.error(`Error loading enemy ${e}:\n${err.stack ? err.stack : err}`);
		}
	});
};