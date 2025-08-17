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

export const attendance = async (req, res, next) => {
  const { from, to } = req.query;

  const groupedByUser = zkData.reduce((acc, log) => {
    if (!acc[log.deviceUserId]) {
      acc[log.deviceUserId] = [];
    }
    acc[log.deviceUserId].push(log);
    return acc;
  }, {});

  const startDate = new Date(`${from}T00:00:00+08:00`);
  const endDate = new Date(`${to}T23:59:59+08:00`);

  const result = Object.keys(groupedByUser)
    .map((key) => {
      const logsForDay = groupedByUser[key].filter((log) => {
        const ts = new Date(log.recordTime); // assume ISO string
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
    .filter(Boolean);
  res.status(200).json(result);
};

export const dailyAttendance = async (req, res, next) => {
  const groupedByUser = zkData.reduce((acc, log) => {
    if (!acc[log.deviceUserId]) {
      acc[log.deviceUserId] = [];
    }
    acc[log.deviceUserId].push(log);
    return acc;
  }, {});

  res.status(200).json(groupedByUser);
};
