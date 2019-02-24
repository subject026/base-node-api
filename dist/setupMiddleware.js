"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
exports.default = (app) => {
    console.log("Node environment set to", config_1.default.env);
    app.use(body_parser_1.default.json({ type: "application/json" }));
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(cookie_parser_1.default());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", config_1.default.frontendUrl);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });
    app.use(morgan_1.default("dev"));
    app.use((req, res, next) => {
        // If there is a token attached to the request we verify it
        // and attach _id and user permissions to the request object
        if (req.cookies.token) {
            const token = jsonwebtoken_1.default.verify(req.cookies.token, config_1.default.appSecret);
            console.log(token);
            req.user = {
                _id: token._id,
                isAdmin: token.isAdmin
            };
            return next();
        }
        return next();
    });
};
