const BaseController = require('./base.controller');
const UserRepository = require('../domain/repositories/user.repository');
const repository = new UserRepository();

/**
 * @author Matheus Mol
 */

class UserController extends BaseController {
	constructor() {
		super();
	}

	async post(req, res) {
		try {
			const posted = await repository.post(req.body);

			if (posted.error) return super.sendError(res, { message: posted.error });

			super.post(res, { message: 'Saved successfully!' });
		} catch (err) {
			super.sendError(res, err);
		}
	}

	async postFollower(req, res) {
		try {
			const posted = await repository.postFollower(req.body);

			if (posted.error) return super.sendError(res, { message: posted.error });

			super.post(res, { message: 'Following successfully!' });
		} catch (err) {
			super.sendError(res, err);
		}
	}

	async get(req, res) {
		try {
			const got = await repository.get(req.params);

			if (got.error) return super.sendError(res, { message: 'Search failed!' });
			if (got.length < 1) return super.post(res, { message: 'User not found!' });
			super.post(res, got);
		} catch (err) {
			super.sendError(res, err);
		}
	}

	async put(req, res) {
		try {
			const putted = await repository.put(req);

			if (putted.error) return super.sendError(res, { message: putted.error });

			super.post(res, { message: 'Successfully changed!' });
		} catch (err) {
			super.sendError(res, err);
		}
	}

	async delete(req, res) {
		try {
			const deleted = await repository.delete(req.body);

			if (deleted === 'Error' || null) return res.status(401).send({ message: 'Failed to delete' });

			super.post(res, { message: 'Successfully deleted!' });
		} catch (err) {
			super.sendError(res, err);
		}
	}
}

module.exports = new UserController();
