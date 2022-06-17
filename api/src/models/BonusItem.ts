import { table } from "console";
import pg from "../db";

const tableName = "bonus_item";

export interface ItemEntry {
  id: number;
  name: string;
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
  try {
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
    console.log(addBonusItem[0].id);
    return addBonusItem[0].id;
  } catch (err) {
    throw new Error("Error adding item to DB");
  }
};

export const getItemIDByName = async (name: string) => {
  const itemID = await pg.select("id").from(tableName).where("name", name);
  return itemID;
};

export const getItemNameByID = async (id: number) => {
  const itemID = await pg.select("name").from(tableName).where("id", id);
  return itemID;
};
