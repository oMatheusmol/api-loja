const HttpStatusCode = require('../helpers/httpStatusCode');
const Exception = require('./exception');

/**
 * @author Matheus Mol
 */

module.exports = class InternalErrorException extends Exception {
	constructor(message) {
		super(message, HttpStatusCode.INTERNAL_SERVER_ERROR);
	}
};
