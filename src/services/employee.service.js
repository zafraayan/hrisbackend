// import Employee from "../models/employees.model.js";

// export const createEmployees = async (employeeData) => {
//   const employee = new Employee(employeeData);
//   return await employee.save();
// };

// export const getEmployees = async () => {
//   return await Employee.find();
// };

import Employee from "../models/employees.model.js";

export const createEmployee = async (employeeData) => {
  const employee = new Employee(employeeData);
  return await employee.save();
};

export const getEmployees = async () => {
  return await Employee.find();
};
