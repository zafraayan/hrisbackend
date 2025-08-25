import express from "express";
import {
  addEmplogs,
  dailyLogs,
  delEmplogs,
  monthlyLogs,
  refetchLogs,
} from "../controllers/logs.controller.js";

const router = express.Router();

router.post("/", addEmplogs);

router.get("/daily-logs", dailyLogs);
router.get("/monthly-logs", monthlyLogs);
router.get("/refetch-logs", refetchLogs);
router.delete("/delete-logs", delEmplogs);
// router.get("/", getLogs);

export default router;
