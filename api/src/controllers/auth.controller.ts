import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { addUser, getUserByEmail, User } from "../models/User";
import { addEmail } from "../models/Whitelist";
import { checkList } from "../models/Whitelist";

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
    req.body.password = hashedPass;

    const existing = await getUserByEmail(email);
    if (existing) {
      throw new Error("User with this email already exists");
    }
    // need to add hourly rate and password
    //addUser(first_name, last_name, email, password)
  } catch (err) {
    next(err);
  }
};

export const addApproved = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw new Error("Enter Email Address");
    }

    const check = await checkList(email);

    if (email == check.email) {
      throw new Error("Email already exists");
    }

    addEmail(email);
    res.status(200).send();
  } catch (err) {
    res.status(401);
    next(err);
  }
};
