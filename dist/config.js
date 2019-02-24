"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const lodash_1 = require("lodash");
dotenv.config();
const env = process.env.NODE_ENV || "PROD";
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
    default:
        envConfig = {
            // Use Heroku port
            port: process.env.PORT,
            db: process.env.PROD_DB_URL,
            frontendUrl: process.env.PROD_FRONTEND_URL
        };
}
const fullConfig = lodash_1.merge(baseConfig, envConfig);
exports.default = fullConfig;
