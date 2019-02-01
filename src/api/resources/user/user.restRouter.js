const router = require('express')();

const userController = require('./user.controller');

router.route('/').post(userController.createOne);

module.exports = router;
