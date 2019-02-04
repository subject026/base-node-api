const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = global.Promise;

module.exports = () => {
  mongoose.connect(config.db, { useNewUrlParser: true });
};
