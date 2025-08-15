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
import { zkData } from "./zkdata.js";

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

export const getLates = async (req, res, next) => {
  const { cDate } = req.query;

  try {
    if (!cDate) {
      return res
        .status(400)
        .json({ message: "cDate query parameter is required" });
    }

    // Group data by deviceUserId
    const groupedByUser = zkData.reduce((acc, log) => {
      if (!acc[log.deviceUserId]) {
        acc[log.deviceUserId] = [];
      }
      acc[log.deviceUserId].push(log);
      return acc;
    }, {});

    const startDate = new Date(`${cDate}T00:00:00`);
    const endDate = new Date(`${cDate}T23:59:59`);
    // const startDate = new Date(`2025-07-31T00:00:00`);
    // const endDate = new Date(`2025-07-31T23:59:59`);

    const result = Object.keys(groupedByUser)
      .map((key) => {
        // Filter logs for this user on the specified date
        const logsForDay = groupedByUser[key].filter((log) => {
          const ts = new Date(log.recordTime);
          return ts >= startDate && ts <= endDate;
        });

        if (logsForDay.length > 0) {
          return {
            deviceUserId: key,
            recordTime: logsForDay.map((log) => log.recordTime),
          };
        }

        return null;
      })
      .filter(Boolean); // remove null entries

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
