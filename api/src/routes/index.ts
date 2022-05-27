import express, { Request, Response } from "express";
import { unprotected } from "../controllers";
import { login, logout, register } from "../controllers/auth.controller";
import { protectedStuff } from "../controllers/protected.controller";

export const router = express.Router();

router.get("", unprotected);
router.get("/login", login);
router.get("/logout", logout);
router.get("/register", register);
router.get("/protected", protectedStuff);
