"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restRouter = require('express').Router();
const { getCurrentUser, login, logout } = require('./modules/auth');
const userRouter = require('./resources/user/user.restRouter');
// api
restRouter.route('/currentuser').get(getCurrentUser);
restRouter.route('/login')
    .post(login);
restRouter.route('/logout')
    .get(logout);
// api/user
restRouter.use('/user', userRouter);
exports.default = restRouter;
