import { NextFunction } from "connect";
import { Response } from "express";
import { getUserByID } from "../models/User";
import { verifyJWT } from "../utils/jwtUtils";

export const protectRoute = (req: any, res: Response, next: NextFunction) => {
  let token;
  const authHeader = "authorization";
  if (req.get(authHeader) && req.get(authHeader).startsWith("Bearer")) {
    try {
      token = req.get(authHeader).split(" ")[1];

      const id = verifyJWT(token);
      if (!id) {
        throw new Error("Token could not be verified");
      }
      const user = getUserByID(id);
      req.user = user;
      // req.user = user
      next();
    } catch (err) {
      console.log(err);
      res.sendStatus(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token provided");
  }
};
