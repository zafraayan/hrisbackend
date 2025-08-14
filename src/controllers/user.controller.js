import { createUser, getUsers } from "../services/user.service.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "attlog.dat");

const app = express();
app.use(cors());

export const addUser = async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const listUsers = async (req, res, next) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getAttendance = async (req, res, next) => {
  try {
    // Read the file using promises
    const data = await fs.readFile(filePath, "utf8");

    // Split data into rows
    const logs = data
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [userId, date, time] = line.trim().split(/\s+/);
        return {
          userId,
          timestamp: `${date}T${time}`,
        };
      });

    // Group records by ID
    const groupedByUser = logs.reduce((acc, log) => {
      if (!acc[log.userId]) {
        acc[log.userId] = [];
      }
      acc[log.userId].push(log);
      return acc;
    }, {});

    // Criterion initialization
    const { cDate } = req.query;
    const keys = Object.keys(groupedByUser);
    const startDate = new Date(`${cDate}T00:00:00`);
    const endDate = new Date(`${cDate}T23:59:59`);

    const result = [];

    keys.forEach((key) => {
      const wew = logs.filter((el) => {
        const ts = new Date(el.timestamp);
        return el.userId === key.toString() && ts >= startDate && ts <= endDate;
      });

      if (wew.length > 0) {
        result.push({
          id: key.toString(),
          timestamps: wew.map((log) => log.timestamp),
        });
      }
    });

    res.json(result);
  } catch (error) {
    console.error("Error reading attlog.dat:", error);
    res.status(500).send("Failed to read attlog.dat");
  }
};
