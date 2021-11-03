const router = require('express').Router();
const controller = require('../controllers/auth.controller');

/**
 * @author Matheus Mol
 */

router.post('/access-token', controller.accessToken);
router.get('/refresh-token', controller.refreshToken);

module.exports = app => app.use('/api/v1/auth', router);
