const HttpStatusCode = require('../helpers/httpStatusCode');
const Exception = require('./exception');

/**
 * @author Matheus Mol
 */

module.exports = class ForbiddenException extends Exception {
	constructor(message) {
		super(message, HttpStatusCode.FORBIDDEN);
	}
};
