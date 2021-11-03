/* eslint-disable no-unused-vars */
const { createLogger, format, transports } = require('winston');
const path = require('path');

/**
 * @author Matheus Mol
 */

const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.simple(),
		format.timestamp(),
		format.printf(
			info => `[${new Date(info.timestamp).toLocaleString()}] ${info.level} ${info.message}`,
		),
	),
	transports: [
		new transports.File({
			maxsize: 5120000,
			maxFiles: 5,
			filename: path.join(__dirname, '..', 'logs', 'testeLogger.log'),
		}),
		new transports.Console({
			level: 'debug',
		}),
	],
});

logger.stream = {
	write: function (message, encoding) {
		logger.info(message.trim());
	},
};

module.exports = logger;
