import { Request, Response } from "express";

export const unprotected = (req: Request, res: Response) => {
  res.sendStatus(200);
};
