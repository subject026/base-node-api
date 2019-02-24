import * as jwt from "jsonwebtoken";
import express from "express";
import { User, IUserModel } from "../resources/user/user.model";

const checkCookie = async (req: express.Request, res: express.Response) => {
  if (req.user) {
    try {
      const user = (await User.findById(req.user._id)) as IUserModel;
      if (!user) {
        // Cookie had a verified token but no user found for _id
        // Clear cookie
        res.clearCookie("token");
        res.status(404).json({
          message: "User not found",
          user: {
            isLoggedIn: false
          }
        });
      }
      res.status(200).json({
        user: {
          isLoggedIn: true,
          email: user.email,
          isAdmin: user.isAdmin
        }
      });
    } catch (err) {
      console.log("\n\nERRRR\n\n", err.message);
      res.status(400).json({ message: "Could not check current user!" });
    }
  } else {
    res.send({ user: { isLoggedIn: false } });
  }
};

const login = async (req: express.Request, res: express.Response) => {
  // Check if already logged in
  if (req.user) {
    // 409:  conflict
    return res.status(409).json({ message: "Already logged in!" });
  }

  // Look up user
  let user;
  try {
    user = (await User.findOne({ email: req.body.email })
      .select("email password isAdmin")
      .exec()) as IUserModel;
  } catch (err) {
    console.log("ERR: ", err);
  }
    
  if (!user) return res.status(401).json({message: 'Login failed!'})
  
  const match = await user.checkPassword(req.body.password);

  // no match : Send response advising login failed
  if (!match) return res.status(401).send({ message: "login failed!" });

  // match : Sign jwt and add to cookie
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.APP_SECRET
  );
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
  });
  return res
    .status(200)
    .json({ user: { email: user.email, isAdmin: user.isAdmin } });
};

const logout = (req: express.Request, res: express.Response) => {
  res.clearCookie("token");
  return res.json({ user: false });
};

export { checkCookie, login, logout };
