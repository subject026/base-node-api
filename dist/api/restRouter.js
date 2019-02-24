"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restRouter = require("express").Router();
const auth_1 = require("./util/auth");
const user_restRouter_1 = __importDefault(require("./resources/user/user.restRouter"));
// api
restRouter.route("/currentuser").get(auth_1.checkCookie);
restRouter.route("/login").post(auth_1.login);
restRouter.route("/logout").get(auth_1.logout);
// api/user
restRouter.use("/user", user_restRouter_1.default);
exports.default = restRouter;
