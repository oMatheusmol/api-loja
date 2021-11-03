/* eslint-disable no-unused-vars */
'use strict';
const jwt = require('jsonwebtoken');
const authConfig = require('../../infrastructure/config/auth.json');
const JwtUtil = require('../utils/jwtUtil');

/**
 * @author Matheus Mol
 */

module.exports.verifyApiKey = async (req, scopes, schema) => {
	// Get auth header value
	const token = req.headers['x-api-key'];

	//exist token
	if (token) {
		// Verify token
		const isValid = JwtUtil.verify(token, authConfig.secret, (err, decoded) => {
			//invalid token (expired or other)
			if (err) {
				req.tokenError = `Token ${err.message}`;
				return false;
			} else {
				// Save session in request
				req.security = decoded.data;
				return true;
			}
		});
		return isValid;
	} else {
		//token error
		req.tokenError = 'Token is required. Access Denied';
		return false;
	}
};

/**
 * Bearer token validation
 */

module.exports.verifyBearer = (req, scopes, schema) => {
	let sus = false;
	// Get auth header value
	const apiKey = req.headers['authorization'];

	// Check if bearer is undefined
	if (!apiKey) {
		//token error
		req.tokenError = 'Token is required: Access Denied';
	}
	const parts = apiKey.split(' ');

	if (parts.length !== 2) {
		req.tokenError = 'Token error';
		return;
	}

	const [sch, token] = parts;

	if (!/^Bearer$/i.test(sch)) {
		req.tokenError = 'Token badformatted';
		return;
	}

	// Verify token
	jwt.verify(token, authConfig.secret, function (err, decoded) {
		//invalid token (expired or other)

		if (err) {
			req.tokenError = `Token ${err.message}`;
		} else {
			// Save session in request
			req.security = decoded.data;
			sus = true;
		}
	});
	return sus;
};
