import express from "express";
import {
  attendance,
  createEmployees,
  dailyAttendance,
  listEmployees,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/", createEmployees);

router.get("/", listEmployees);
router.get("/attendance", attendance);
router.get("/daily-attendance", dailyAttendance);

export default router;
