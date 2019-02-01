const generateControllers = require('../../modules/generateControllers');
const User = require('./user.model');

module.exports = generateControllers(User);
