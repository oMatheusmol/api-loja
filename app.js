'use strict';

/**
 * @author Matheus Mol
 */

const config = require('./src/infrastructure/database/mongoFactory');
const app = require('./src/app/middlewares/middlewares');
const logger = require('./src/infrastructure/logger/logger');

//start app

const database = 'MySecretModel';
const port = process.env.PORT || 7000;
const server = app.listen(port, () => {
	logger.info(`API running on Port ${port} | Enviroment: ${'Development'} | Database: ${database}`);
});
config.connect(`mongodb://127.0.0.1:27017/${database}-api`, () => server);
module.exports = server;
