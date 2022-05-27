import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  res.send("login");
};

export const logout = (req: Request, res: Response) => {
  res.send("logout");
};

export const register = (req: Request, res: Response) => {
  res.send("register");
};
