// eslint-disable-next-line no-unused-vars
const helmet = require('helmet');
const express = require('express');
const app = express();
const cors = require('cors');
const morganBody = require('morgan-body');
const logger = require('../../infrastructure/logger/logger');

/**
 * @author Matheus Mol
 */

// morganBody(app, {
//     stream: logger.stream,
//     maxBodyLength: 250,
//     logReqDateTime: false,
//     logReqUserAgent: false,
//     logIP: false,
//     logAllReqHeader:  true,
//     filterParameters: ['senha', 'PASSWORD'],
//     noColors: true,
//   });

app.use(cors());

//only https
// app.use(helmet());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(
	cors({
		exposedHeaders: ['X-Total-Count', 'X-Total-Page', 'X-Page'],
	}),
);

// Swagger
require('./swagger')(app);

//use all controllers
require('../routes')(app);

module.exports = app;
