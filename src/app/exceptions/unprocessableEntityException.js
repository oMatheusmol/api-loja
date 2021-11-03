const HttpStatusCode = require('../helpers/httpStatusCode');
const Exception = require('./exception');

/**
 * @author Matheus Mol
 */

module.exports = class UnprocessableEntityException extends Exception {
	constructor(message) {
		super(message, HttpStatusCode.UNPROCESSABLE_ENTITY);
	}
};
