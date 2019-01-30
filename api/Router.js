const router = require('express').Router();

const authController = require('./controllers/Auth');

router.route('/login').post(authController.login);

module.exports = router;
