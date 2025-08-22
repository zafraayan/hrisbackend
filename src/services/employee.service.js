import Employees from "../models/employees.model.js";

export const getEmployees = async () => {
  return await Employees.find();
};

export const addEmployee = async (userData) => {
  const employee = new Employees(userData);
  return await employee.save();
};
