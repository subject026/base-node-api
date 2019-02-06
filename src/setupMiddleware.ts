import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import jwt from "jsonwebtoken";

import config from "./config";

interface UserToken {
  _id: string;
  iat: number;
  isAdmin: boolean;
}

export default (app: express.Application) => {
  console.log("Node environment set to", config.env);
  app.use(bodyParser.json({ type: "application/json" }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.header("Access-Control-Allow-Origin", config.frontendUrl);
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    }
  );

  app.use(morgan("dev"));

  app.use((req, res, next) => {
    // If there is a token attached to the request we verify it
    // and attach _id and user permissions to the request object
    if (req.cookies.token) {
      const token = jwt.verify(
        req.cookies.token,
        config.appSecret
      ) as UserToken;
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
