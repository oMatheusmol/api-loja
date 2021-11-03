const { MongoClient, ObjectId } = require('mongodb');

class Db {
	constructor() {
		this.client = null;
		this.db = null;
		this.collections = new Map();
		this.ObjectId = ObjectId;
	}

	connect(url, options, callback) {
		const self = this;
		if (this.client) {
			if (this.client.isConnected()) {
				return callback(null);
			}
			this.client.on('serverOpening', () => {
				callback(null);
			});
			return;
		}
		Object.assign(options, {
			useNewUrlParser: true,
		});
		this.client = new MongoClient(url, options);
		this.client.connect((err, client) => {
			if (err) {
				return callback(err);
			}
			self.db = client.db();
			callback(null);
		});
	}

	getCollection(collectionName) {
		let collection = this.collections.get(collectionName);
		if (!collection) {
			collection = this.db.collection(collectionName);
			this.collections.set(collectionName, collection);
		}
		return collection;
	}

	close(callback) {
		if (!this.client) {
			return callback();
		}
		const self = this;
		this.client.close(false, err => {
			if (err) {
				return callback(err);
			}
			self.client = null;
			self.db = null;
			self.collections.clear();
			callback();
		});
	}
}

module.exports = Db;
