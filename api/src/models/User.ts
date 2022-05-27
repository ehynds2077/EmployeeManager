const users = ["test", "user"];

export const getUserByID = (id: string) => {
  return users.find((user) => {
    return user === id;
  });
};
