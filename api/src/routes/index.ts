import express, { Request, Response } from "express";
import { unprotected } from "../controllers";
import { login, logout, register } from "../controllers/auth.controller";
import { protectedStuff } from "../controllers/protected.controller";
import { protectRoute } from "../middleware/protectRoute";
import { approve } from "../middleware/approveUser";

export const router = express.Router();

router.get("", unprotected);
router.post("/login", login);
// router.get("/logout", logout);
router.post("/register", register, approve);
router.get("/protected", protectRoute, protectedStuff);
