import express, { Request, Response } from "express";
import { unprotected } from "../controllers";
import { AdminAddEmployee, register } from "../controllers/auth.controller";
import { protectedStuff } from "../controllers/protected.controller";
import { protectRoute } from "../middleware/protectRoute";
// import { addApproved } from "../controllers/auth.controller";
import { approve } from "../middleware/approveUser";

export const router = express.Router();

router.get("", unprotected);
// router.post("/login", login);
// router.get("/logout", logout);
// router.post("/approve", addApproved);
router.post("/register", register);
router.post("/addEmployee", AdminAddEmployee);
// router.get("/protected", protectRoute, protectedStuff);
