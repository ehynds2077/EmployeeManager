import pg from "../db";

const tableName = "whitelist";

export interface Whitelist {
  id: number;
  email: string;
}

export const addEmail = async (email: string) => {
  const result = await pg.table(tableName).insert({ email: email });
};

export const checkList = async (email: string) => {
  const res = await pg.select().table(tableName).where("email", email);
  if (res.length) {
    return res[0];
  } else {
    return null;
  }
};
