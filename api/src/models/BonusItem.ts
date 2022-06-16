import { table } from "console";
import pg from "../db";

const tableName = "bonus_item";

export interface ItemEntry {
  id: number;
  itemName: string;
  pickupRateDry: number;
  pickupRateWet: number;
  deliveryRateDry: number;
  deliveryRateWet: number;
}

export const addBonusItem = async (
  name: string,
  pickupRateDry: number,
  pickupRateWet: number,
  deliveryRateDry: number,
  deliveryRateWet: number
) => {
  const addBonusItem = await pg
    .table(tableName)
    .insert({
      name: name,
      pickup_rate_dry: pickupRateDry,
      pickup_rate_wet: pickupRateWet,
      del_rate_dry: deliveryRateDry,
      del_rate_wet: deliveryRateWet,
    })
    .returning("id");
  return addBonusItem[0].id;
};

export const getItemByName = async (name: string) => {
  const itemID = await pg.select("*").from(tableName);
};
