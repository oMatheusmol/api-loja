'use strict';

const BaseRepository = require('./base.repository');
const database = require('../../../infrastructure/database/mongoFactory');

/**
 * @author Matheus Mol
 */

module.exports = class UserRepository extends BaseRepository {
	constructor() {
		super();
		this.collectionName = 'users';
	}

	async post(body) {
		try {
			const isValid = await this.valid(body);
			if (isValid.error) return { error: isValid.error };

			if (body.isPrime) {
				body.pictures = [];
				body.followers = [];
			}
			body.following = [];
			body.createdAt = new Date();
			body.updatedAt = new Date();

			await database.getCollection(this.collectionName).insertOne(body);

			return true;
		} catch (error) {
			return { error: error };
		}
	}

	async postFollower(body) {
		try {
			const me = await this.get(body);
			const follower = await this.getFollowingUsername(body);
			this.putFollowing(me[0], follower[0]);
			this.putFollower(me[0], follower[0]);
			return true;
		} catch (error) {
			return { error: error };
		}
	}

	async get(params) {
		try {
			const users = await database
				.getCollection(this.collectionName)
				.find({ username: params.username })
				.toArray();

			return users;
		} catch (error) {
			return { error: error };
		}
	}

	async getFollowingUsername(params) {
		try {
			const users = await database
				.getCollection(this.collectionName)
				.find({ username: params.followingUsername })
				.toArray();

			return users;
		} catch (error) {
			return { error: error };
		}
	}

	async getByEmail(params) {
		try {
			const email = await database
				.getCollection(this.collectionName)
				.find({ email: params.email })
				.toArray();

			return email;
		} catch (error) {
			return { error: error };
		}
	}

	async put(req) {
		try {
			const user = await this.get(req.params);
			if (user.error) return { error: 'User not found!' };
			const username = user[0].username;

			await database.getCollection(this.collectionName).updateOne({ username: username }, [
				{
					$set: {
						email: req.body.email,
						profilePicture: req.body.profilePicture,
						password: req.body.password,
						updatedAt: new Date(),
					},
				},
			]);
		} catch (error) {
			return { error: error };
		}
	}

	async putFollower(me, follower) {
		try {
			await database.getCollection(this.collectionName).updateOne(
				{ username: follower.username },
				{
					$push: {
						followers: follower.followers.push(me.username),
					},
				},
			);
		} catch (error) {
			return { error: error };
		}
	}

	async putFollowing(me, following) {
		try {
			await database.getCollection(this.collectionName).updateOne(
				{ username: me.username },
				{
					$push: {
						following: me.following.push(following.username),
					},
				},
			);
		} catch (error) {
			return { error: error };
		}
	}

	// async delete(body) {
	// 	try {
	// 	} catch (err) {}
	// }

	async valid(body) {
		const username = await this.get(body);
		const email = await this.getByEmail(body);

		if (username.length > 0) return { error: 'Username is not valid!' };
		if (email.length > 0) return { error: 'Email is not valid!' };
		return true;
	}
};
