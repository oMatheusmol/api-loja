const router = require('express').Router();
const controller = require('../controllers/user.controller');

/**
 * @author Matheus Mol
 */

router.post('/', controller.post);
router.post('/follower', controller.postFollower);
router.get('/:username', controller.get);
router.put('/:username', controller.put);

module.exports = app => app.use('/api/v1/users', router);
