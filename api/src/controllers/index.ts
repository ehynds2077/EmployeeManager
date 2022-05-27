import { Request, Response } from "express";
import { getUserByID } from "../models/User";

export const unprotected = (req: Request, res: Response) => {
  console.log(getUserByID("test"));
  res.send("public!");
};
