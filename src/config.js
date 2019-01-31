require('dotenv').config({ path: '.env' });

module.exports = {
  post: process.env.PORT,
  db: {
    url: process.env.DB,
  },
};
