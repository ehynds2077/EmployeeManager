import pg from "../db";

const tableName = "item_entry";

export interface ItemEntry {
  id: number;
  itemID: number;
  wetUnit: boolean;
  numEmps: number;
  pickup: boolean;
}

export const addItemEntry = async (
  entryID: number,
  itemId: number,
  wetUnit: boolean,
  numEmps: number,
  pickup: boolean
) => {
  const addItem = await pg.table(tableName).insert({
    entry_id: entryID,
    item_id: itemId,
    wet_unit: wetUnit,
    num_emps: numEmps,
    pickup: pickup,
  });

  return addItem[0];
};
