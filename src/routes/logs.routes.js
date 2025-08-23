import express from "express";
import {
  addEmplogs,
  dailyLogs,
  monthlyLogs,
} from "../controllers/logs.controller.js";

const router = express.Router();

router.post("/", addEmplogs);
router.get("/daily-logs", dailyLogs);
router.get("/monthly-logs", monthlyLogs);
// router.get("/", getLogs);

export default router;
