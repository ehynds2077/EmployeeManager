import express, { Request, Response } from "express";
import { unprotected } from "../controllers";
import { register, login } from "../controllers/auth.controller";
import {
  adminAddBonusItem,
  adminAddEmployee,
} from "../controllers/admin.controller";
import { protectedStuff } from "../controllers/protected.controller";
import { protectRoute } from "../middleware/protectRoute";
import {
  addBonus,
  addTimesheetEntry,
  getEmpBonusItemDetails,
  getEmpHoursMiles,
  getEmpTotal,
} from "../controllers/employee.controller";

export const router = express.Router();

router.get("", unprotected);
router.post("/login", login);
// router.get("/logout", logout);
router.post("/addItem", adminAddBonusItem);
router.post("/register", register);
router.post("/addEmployee", adminAddEmployee);
router.post("/addBonus", addBonus);
router.post("/addEntry", addTimesheetEntry);
router.get("/getMilesHours", getEmpHoursMiles);
router.get("/getBonusDetails", getEmpBonusItemDetails);
router.get("/getEmployeeTotal", getEmpTotal);
// router.get("/protected", protectRoute, protectedStuff);
