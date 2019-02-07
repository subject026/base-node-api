const restRouter = require("express").Router();

import { checkCookie, login, logout } from "./util/auth";
import userRouter from "./resources/user/user.restRouter";

// api
restRouter.route("/currentuser").get(checkCookie);
restRouter.route("/login").post(login);
restRouter.route("/logout").get(logout);

// api/user
restRouter.use("/user", userRouter);

export default restRouter;
