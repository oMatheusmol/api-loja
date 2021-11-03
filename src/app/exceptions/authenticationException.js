'use strict';
const HttpStatusCode = require('../helpers/httpStatusCode');
const Exception = require('./exception');

/**
 * @author Matheus Mol
 */

module.exports = class AutheticationException extends Exception {
	constructor(message) {
		super(message, HttpStatusCode.UNAUTHORIZED);
	}
};
