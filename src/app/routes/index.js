const fs = require('fs');
const path = require('path');

/**
 * @author Matheus Mol
 */

module.exports = app => {
	fs.readdirSync(__dirname)
		.filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'README.md')
		.forEach(file => require(path.resolve(__dirname, file))(app));
};
