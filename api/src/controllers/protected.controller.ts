import { Request, Response } from "express";

export const protectedStuff = (req: Request, res: Response) => {
  res.send("protected");
};
