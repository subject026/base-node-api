import express from "express";

import { createOne, getAll } from "./user.controller";

const protect = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Log in first!" });
  }
  console.log(req.user);
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

const router = express.Router();

router.route("/").post(createOne);
router.route("/").get(protectAdmin, getAll);

export default router;
