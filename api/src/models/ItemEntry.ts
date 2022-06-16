import pg from "../db";

const tableName = "item_entry";

export interface ItemEntry {
  id: number;
  itemID: number;
  wetUnit: boolean;
  numEmps: number;
}

export const addItemEntry = async (
  itemId: number,
  wetUnit: boolean,
  numEmps: number
) => {
  const addItem = await pg
    .table(tableName)
    .insert({ item_id: itemId, wet_unit: wetUnit, num_emps: numEmps })
    .returning("id");
  return addItem[0].id;
};
