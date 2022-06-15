import { NextFunction, Request, Response } from "express";
import { checkList } from "../models/Whitelist";

export const approve = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Middleware");
  const email = req.body.email;
  console.log(email);

  const result = await checkList(email);
  if (!result) {
    res.status(403).send();
  } else {
    next();
  }
};
