import express from "express";
import { addEmplogs, listLogs } from "../controllers/logs.controller.js";

const router = express.Router();

router.post("/", addEmplogs);
router.get("/", listLogs);
// router.get("/", getLogs);

export default router;
