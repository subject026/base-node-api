const router = require('express').Router();

const { getCurrentUser, login, logout } = require('./modules/auth');
const userRouter = require('./resources/user/user.restRouter');

router.route('/login')
  .get(getCurrentUser)
  .post(login);

router.route('/logout')
  .get(logout);

router.route('/user', userRouter);

module.exports = router;
