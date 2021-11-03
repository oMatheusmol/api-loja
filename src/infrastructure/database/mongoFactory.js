const Db = require('../config/dbConfigMongo');

const dbInstance = new Db();
module.exports = {
	close: callback => {
		console.log('[MongoDB] Database trying to disconnect');
		if (dbInstance) {
			return dbInstance.close(err => {
				if (err) {
					console.log('[MongoDB] Error on closing database');
				}
				callback(err);
			});
		}
		callback();
	},
	connect: (uri, callback) => {
		dbInstance.connect(uri, { useUnifiedTopology: true }, err => {
			if (err) {
				console.log('[MongoDB] Database failed to connect - ', err.message);
				return callback(err);
			}
			console.log('[MongoDB] Database connected');
			callback(null);
		});
	},
	getCollection: name => dbInstance.getCollection(name),
	ObjectId: dbInstance.ObjectId,
};
