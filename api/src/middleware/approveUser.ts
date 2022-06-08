import { NextFunction, Request, Response } from "express";
import { addUser } from "../models/User";

export const approve = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, first_name, last_name } = req.body;
  req.body.approved = false;

  var approved: boolean = true;

  if (approved) {
    var rate: number = 20.0;
    var admin: boolean = false;
    addUser(first_name, last_name, email, password, rate, admin);
    req.body.approved = true;
  }
};
