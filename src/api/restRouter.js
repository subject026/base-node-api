const restRouter = require('express').Router();

const { getCurrentUser, login, logout } = require('./modules/auth');
const userRouter = require('./resources/user/user.restRouter');

const protect = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in first!' });
  }
  console.log(req.user);
  next();
};

// api
restRouter.route('/currentuser').get(getCurrentUser);
restRouter.route('/login')
  .post(login);
restRouter.route('/logout')
  .get(logout);

// api/user
restRouter.use('/user', protect, userRouter);

module.exports = restRouter;
