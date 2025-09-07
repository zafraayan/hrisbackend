import { addEmployee, getEmployees } from "../services/employee.service.js";
import Employees from "../models/employees.model.js";
import { zkData } from "./zkdata.js";
import { zkusers } from "./zkusers.js";

export const listEmployees = async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

export const createEmployees = async (req, res, next) => {
  try {
    const employee = new Employees(req.body);
    const zaf = await employee.save();

    res.status(200).json(zaf); // send response once with all saved employees
  } catch (error) {
    next(error);
  }
};

export const attendance = async (req, res, next) => {
  const { from, to } = req.query;

  const groupedByUser = zkData.reduce((acc, log) => {
    if (!acc[log.userSn]) {
      acc[log.userSn] = [];
    }
    acc[log.userSn].push(log);
    return acc;
  }, {});

  const startDate = new Date(`${from}T00:00:00+08:00`);
  const endDate = new Date(`${to}T23:59:59+08:00`);

  const result = Object.keys(groupedByUser)
    .map((key) => {
      const logsForDay = groupedByUser[key].filter((log) => {
        const ts = new Date(log.recordTime);
        return ts >= startDate && ts <= endDate;
      });

      if (logsForDay.length > 0) {
        // format times
        const times = logsForDay.map((log) =>
          new Date(log.recordTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true, // 24-hour format
          })
        );

        return {
          userSn: key,
          times, // e.g. ["08:05", "12:01", "13:02", "17:30"]
        };
      }
      return null;
    })
    .filter(Boolean);

  console.log(from);
  console.log(to);

  res.status(200).json(result);
};

export const dailyAttendance = async (req, res, next) => {
  const groupedByUser = zkData.reduce((acc, log) => {
    if (!acc[log.userSn]) {
      acc[log.userSn] = [];
    }
    acc[log.userSn].push(log);
    return acc;
  }, {});

  const startDate = new Date(`2025-08-20T00:00:00+08:00`);
  const endDate = new Date(`2025-08-20T23:59:59+08:00`);

  const result = Object.keys(groupedByUser)
    .map((key) => {
      const logsForDay = groupedByUser[key].filter((log) => {
        const ts = new Date(log.recordTime);
        return ts >= startDate && ts <= endDate;
      });

      if (logsForDay.length > 0) {
        // format times
        const times = logsForDay.map((log) =>
          new Date(log.recordTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true, // 24-hour format
          })
        );

        return {
          userSn: key,
          times, // e.g. ["08:05", "12:01", "13:02", "17:30"]
        };
      }
      return null;
    })
    .filter(Boolean);

  res.status(200).json(result);
};
