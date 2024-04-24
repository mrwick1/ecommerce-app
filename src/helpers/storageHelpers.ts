import { User } from "../types/userType";

// save user data to local storage
export const saveUserToStorage = (userData: User): string | null => {
  const users = getUsersFromStorage();
  if (users.some((user) => user.email === userData.email)) {
    return "Email already exists";
  }
  // add id for user
  userData.id = `user_${new Date().getTime()}`;
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  return null;
};

// get all the users from the local storage
export const getUsersFromStorage = (): User[] => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

// update user in the local storage
export const updateUserInStorage = (updatedUser: User): string | null => {
  const users = getUsersFromStorage();
  const userIndex = users.findIndex((user) => user.id === updatedUser.id);
  if (userIndex === -1) {
    return "User not found";
  }
  const { password, ...userWithoutPassword } = users[userIndex];
  users[userIndex] = { ...userWithoutPassword, ...updatedUser, password };
  localStorage.setItem("users", JSON.stringify(users));
  return null;
};
// delete user from the local storage with userId
export const deleteUserFromStorage = (userId: string) => {
  let users = getUsersFromStorage();
  users = users.filter((user) => user.id !== userId);
  localStorage.setItem("users", JSON.stringify(users));
};
