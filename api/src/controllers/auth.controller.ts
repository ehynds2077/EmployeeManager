import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { getUserByEmail, User } from "../models/User";

import pg from "../db";
import { signJWT } from "../utils/jwtUtils";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    let user = await getUserByEmail(email);
    user = user as User;

    if (!user) {
      throw new Error("Email or password is incorrect or user does not exist");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Email or password is incorrect or user does not exist");
    }

    const token = signJWT(user.id);
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(401);
    next(err);
  }
};

export const logout = (req: Request, res: Response) => {
  res.send("logout");
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("here");
  const { email, password, first_name, last_name } = req.body;

  try {
    if (!email || !password) {
      throw new Error("Please include all required values");
    }
    if ((password as string).length > 72) {
      throw new Error("Password must be at most 72 characters long");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPass = await bcrypt.hash(password, salt);

    const existing = await getUserByEmail(email);
    if (existing) {
      throw new Error("User with this email already exists");
    }

    const result = await pg.table("user").insert({
      email,
      password: hashedPass,
      first_name,
      last_name,
      is_admin: false,
    });

    console.log(result);

    res.status(200).send();
  } catch (err) {
    next(err);
  }
};
