import jwt from "jsonwebtoken";
import { config } from "../config";

export const verifyJWT = (token: string): string | null => {
  const decoded = jwt.verify(token, config.JWT_SECRET) as any;
  if (decoded.id) {
    return decoded.id;
  } else {
    return null;
  }
};

export const signJWT = (id: string): string => {
  const token = jwt.sign(id, config.JWT_SECRET);
  return token;
};
