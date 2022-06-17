import { NextFunction, Request, Response } from "express";
import { addItemEntry } from "../models/ItemEntry";
import { createEntry } from "../models/Timesheet";

export const addTimesheetEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { miles, hours, date, empID } = req.body;
    const dateEntry = new Date(date);
    console.log(date);
    const entry = await createEntry(dateEntry, hours, miles, empID);
    console.log(entry);
    res.json({
      miles: miles,
      hours: hours,
      date: dateEntry,
      empID: empID,
    });
    res.status(200).send();
  } catch (err) {
    next(err);
  }
};

export const addBonus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { entryID, itemID, wetUnit, numEmps } = req.body;
  const isWet: boolean = wetUnit === "true";
  const item = await addItemEntry(entryID, itemID, isWet, numEmps);
  console.log(item);
  res.json({
    entryID: entryID,
    itemID: itemID,
    wetUnit: isWet,
    numEmps: numEmps,
  });
  res.status(200).send();
  try {
  } catch (err) {
    next(err);
  }
};
