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

      next();
    } catch (err) {
      res.status(401);
      next(err);
    }
  }

  if (!token) {
    res.status(401);
    const err = new Error("Not Authorized, no token provided");
    next(err);
  }
};
