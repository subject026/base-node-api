import express from "express";

import { User, IUserModel } from "./user.model";
import { createOne, getAll } from "./user.controller";

const protect = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Log in first!" });
  }
  next();
};

const protectAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.user.isAdmin)
    return res.status(401).json({ message: "Not Authorized!" });
  return next();
};

const signupValidator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { email, password, confirmPassword } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "Email already registered" });
  } catch (err) {
    console.log(err);
  }
  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords didn't match" });
  next();
};

const router = express.Router();

router.route("/").post(signupValidator, createOne);
router.route("/").get(protectAdmin, getAll);

export default router;
