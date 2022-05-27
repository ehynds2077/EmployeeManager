import { Request, Response } from "express";
import { getUserByID } from "../models/User";

export const unprotected = (req: Request, res: Response) => {
  res.sendStatus(200);
};
