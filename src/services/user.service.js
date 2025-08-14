import User from "../models/user.model.js";

export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

export const getUsers = async () => {
  return await User.find();
};
