import { NextFunction, Request, Response } from "express";
import { addItemEntry } from "../models/ItemEntry";
import {
  createEntry,
  getBonusDetails,
  getBonusTotal,
  getHoursMiles,
  getTotal,
} from "../models/Timesheet";

export const addTimesheetEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { miles, hours, date, empID } = req.body;
    const dateEntry = new Date(date);
    await createEntry(dateEntry, hours, miles, empID);
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
  try {
    const { entryID, itemID, wetUnit, numEmps, pickup } = req.body;
    const isWet: boolean = wetUnit === "true";
    const isPickup: boolean = pickup === "true";
    const item = await addItemEntry(entryID, itemID, isWet, numEmps, pickup);
    console.log(item);
    res.json({
      entryID: entryID,
      itemID: itemID,
      wetUnit: isWet,
      numEmps: numEmps,
      pickup: isPickup,
    });
    res.status(200).send();
  } catch (err) {
    next(err);
  }
};

export const getEmpHoursMiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const beginDate: Date = new Date(req.query.beginDate as string);
    const endDate: Date = new Date(req.query.endDate as string);
    const empID: number = parseInt(req.query.empID as string);

    const ret = await getHoursMiles(empID, beginDate, endDate);
    // const ret = await getBonusTotal(empID, beginDate, endDate);
    console.log(ret);

    res.json(ret);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
};

export const getEmpBonusItemDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const beginDate: Date = new Date(req.query.beginDate as string);
    const endDate: Date = new Date(req.query.endDate as string);
    const empID: number = parseInt(req.query.empID as string);

    const ret = await getBonusDetails(empID, beginDate, endDate);

    res.json(ret);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
};

export const getEmpTotal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const beginDate: Date = new Date(req.query.beginDate as string);
    const endDate: Date = new Date(req.query.endDate as string);
    const empID: number = parseInt(req.query.empID as string);

    const ret = await getTotal(empID, beginDate, endDate);

    res.json(ret);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
};
