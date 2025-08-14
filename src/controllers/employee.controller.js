// import { getEmployees, createEmployee } from "../services/employee.service.js";
// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors());

// export const createEmployees = async (req, res, next) => {
//   try {
//     const newEmployee = await createEmployee(req.body);
//     res.status(201).json(newEmployee);
//   } catch (error) {
//     next(error);
//   }
// };

// export const listEmployees = async (req, res, next) => {
//   try {
//     const employees = await getEmployees();
//     res.status(200).json(employees);
//   } catch (error) {
//     next(error);
//   }
// };

import { getEmployees, createEmployee } from "../services/employee.service.js";

export const createEmployees = async (req, res, next) => {
  try {
    const newEmployee = await createEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
};

export const listEmployees = async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};
