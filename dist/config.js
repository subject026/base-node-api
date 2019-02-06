"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const lodash_1 = require("lodash");
dotenv_1.default.config();
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
exports.default = lodash_1.merge(baseConfig, envConfig);
