import * as dotenv from "dotenv";

import { merge } from "lodash";

dotenv.config();
const env = process.env.NODE_ENV || "PROD";

interface APIConfig {
  env: string;
  appSecret: string;
  port: number;
  db: string;
  frontendUrl: string;
}

const baseConfig = {
  env,
  appSecret: process.env.APP_SECRET
};

let envConfig = {};

switch (env) {
  case "DEV":
    envConfig = {
      port: process.env.DEV_PORT,
      db: process.env.DEV_DB_URL,
      frontendUrl: process.env.DEV_FRONTEND_URL
    };
    break;
  case "TEST":
    envConfig = {
      db: process.env.TEST_DB_URL
    };
    break;
  default:
    envConfig = {
      // Use Heroku port
      port: process.env.PORT,
      db: process.env.PROD_DB_URL,
      frontendUrl: process.env.PROD_FRONTEND_URL
    };
}

const fullConfig = merge(baseConfig, envConfig) as APIConfig;

export default fullConfig;
