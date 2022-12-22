import { NextFunction, Request, Response } from "express";
import { addBonusItem } from "../models/BonusItem";
import { addEmail, addEmployee } from "../models/User";

export const adminAddEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, hourlyRate, milesRate } = req.body;
    var email_id = await addEmail(email);
    const ret = await addEmployee(hourlyRate, milesRate, email_id);
    res.json(ret);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
};

export const adminAddBonusItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      pickupRateDry,
      pickupRateWet,
      deliveryRateDry,
      deliveryRateWet,
    } = req.body;

    var id = await addBonusItem(
      name,
      pickupRateDry,
      pickupRateWet,
      deliveryRateDry,
      deliveryRateWet
    );

    res.json({
      id: id,
      name: name,
      pickupRateDry: pickupRateDry,
      pickupRateWet: pickupRateWet,
      deliveryRateDry: deliveryRateDry,
      deliveryRateWet: deliveryRateWet,
    });
    res.status(200).send();
  } catch (err) {
    next(err);
  }
};
