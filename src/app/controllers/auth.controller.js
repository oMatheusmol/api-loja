'use strict';

const BaseController = require('./base.controller');
const AuthRepository = require('../domain/repositories/auth.repository');
const repository = new AuthRepository();

/**
 * @author Matheus Mol
 */

class AuthController extends BaseController {
	constructor() {
		super(repository);
	}

	/**
	 * Realiza o login e retorna um token
	 */
	async accessToken(req, res) {
		try {
			const token = await repository.accessToken(req.body);

			res.send(token);
		} catch (err) {
			super.sendError(res, err);
		}
	}

	async refreshToken(req, res) {
		try {
			const token = await repository._generateTokenJWT(req);

			res.send(token);
		} catch (err) {
			super.sendError(res, err);
		}
	}
}

module.exports = new AuthController();
