const router = require('express').Router();

const { createOne, getAll } = require('./user.controller');

const protect = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Log in first!' });
  }
  console.log(req.user);
  next();
};

const protectAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(401).json({ message: 'Not Authorized!' });
  return next();
};

router.route('/').post(createOne);
router.route('/').get(protectAdmin, getAll);


module.exports = router;
