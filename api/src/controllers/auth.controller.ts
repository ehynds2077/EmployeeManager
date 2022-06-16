import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import {
  addUser,
  addEmail,
  getUserByEmail,
  User,
  getEmailByName,
  addEmployee,
} from "../models/User";

import pg from "../db";
import { signJWT } from "../utils/jwtUtils";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, first_name, last_name, admin } = req.body;

  try {
    if (!email || !password) {
      throw new Error("Please include all required values");
    }
    if ((password as string).length > 72) {
      throw new Error("Password must be at most 72 characters long");
    }

    // Password salting and hashing
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPass = await bcrypt.hash(password, salt);
    req.body.password = hashedPass;

    // If user is admin, add them into user table
    if (admin === "true") {
      console.log("admin here");
      // Add email to emails table
      var email_id: number = await addEmail(email);
      console.log("email added");
      // Add User to users table
      await addUser(first_name, last_name, email_id, hashedPass, admin);
      res.json({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        admin: admin,
      });
      res.status(200).send();
    } else {
      // Check if email has been added by admin
      var emailID = await getEmailByName(email);
      // If email has not been added, throw error
      if (!emailID) {
        throw new Error("Email not authorized");
        // If email has been added, add user to users table
      } else {
        await addUser(first_name, last_name, emailID, hashedPass, admin);
        res.json({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          admin: admin,
        });
        res.status(200).send();
      }
    }
  } catch (err) {
    next(err);
  }
};

export const AdminAddEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, rate } = req.body;
    var email_id = await addEmail(email);
    await addEmployee(rate, email_id);
    res.json({
      email: email,
      rate: rate,
    });
    res.status(200).send();
  } catch (err) {
    next(err);
  }
};

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
    console.log(`password: ${password}`);
    console.log(`password: ${user.password}`);

    if (!valid) {
      throw new Error("Incorrect Password");
    }

    const token = signJWT(user.id);
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(401);
    next(err);
  }
};
