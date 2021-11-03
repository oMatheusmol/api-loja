const HttpStatusCode = require('../helpers/httpStatusCode');
const Exception = require('./exception');

/**
 * @author Matheus Mol
 */

module.exports = class NotFoundException extends Exception {
	constructor(message) {
		super(message, HttpStatusCode.NOT_FOUND);
	}
};
