require('dotenv').config({ path: '.env' });

module.exports = {
  port: process.env.PORT,
  db: {
    url: process.env.DB,
  },
  frontendUrl: process.env.FRONTEND_URL,
  appSecret: process.env.APP_SECRET,
};
