import { Request, Response } from "express";
import { getUserByID } from "../models/User";

export const unprotected = (req: Request, res: Response) => {
  console.log(process.env.JWT_SECRET);
  console.log(getUserByID("test"));
  res.send("public!");
};
