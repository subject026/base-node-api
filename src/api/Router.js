const router = require('express').Router();

const authController = require('./controllers/Auth');

router.route('/login').get(authController.getUser);
router.route('/login').post(authController.login);

router.route('/logout').get(authController.logout);


module.exports = router;
