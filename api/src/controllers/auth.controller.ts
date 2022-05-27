import { Request, Response } from "express";
import { signJWT } from "../utils/jwtUtils";

export const login = (req: Request, res: Response) => {
  const token = signJWT("test");
  res.json({ token: token });
};

export const logout = (req: Request, res: Response) => {
  res.send("logout");
};

export const register = (req: Request, res: Response) => {
  res.send("register");
};
