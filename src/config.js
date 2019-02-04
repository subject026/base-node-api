require('dotenv').config({ path: '.env' });
const { merge } = require('lodash');

const env = process.env.NODE_ENV || 'PROD';

const baseConfig = {
  env,
  appSecret: process.env.APP_SECRET,
};

let envConfig = {};

switch (env) {
  case 'DEV':
    envConfig = {
      port: process.env.DEV_PORT,
      db: process.env.DEV_DB_URL,
      frontendUrl: process.env.DEV_FRONTEND_URL,
    };
    break;
  default:
    envConfig = {
      // Use Heroku port
      port: process.env.PORT,
      db: process.env.PROD_DB_URL,
      frontendUrl: process.env.PROD_FRONTEND_URL,
    };
}

module.exports = merge(baseConfig, envConfig);
