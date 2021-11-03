const BaseRepository = require('./base.repository');
const JwtUtil = require('../../utils/jwtUtil');
const exceptions = require('../../exceptions/index');
const database = require('../../../infrastructure/database/mongoFactory');

/**
 * @author Matheus Mol
 */

module.exports = class AuthRepository extends BaseRepository {
	constructor() {
		super();
	}

	async accessToken(params) {
		try {
			const collectionName = 'accessUser';
			const user = params;
			await database.getCollection(collectionName).insertOne(user);
			if (this.isResultEmpty([user])) {
				throw new exceptions.AutheticationException('Email ou Senha inválido(s)');
			}
			const token = await this._generateTokenJWT(user);
			return token;
		} catch (error) {
			this.handleError(error);
		}
	}

	/**
	 * Gera um token JWT
	 */
	async _generateTokenJWT(user) {
		//dados do token
		const encode = {
			email: user.email,
			password: user.password,
		};

		//generate token
		const token = await JwtUtil.sign(encode);
		const decoded = JwtUtil.decode(token);
		return {
			token: token,
			issuedAt: decoded.iat,
			expiresAt: decoded.exp,
		};
	}
};
