import express from "express";
import {
  addUser,
  listUsers,
  getAttendance,
} from "../controllers/user.controller.js";
import { listEmployees } from "../controllers/employee.controller.js";
import { createEmployee } from "../services/employee.service.js";

const router = express.Router();

router.post("/", addUser);
router.get("/attendance", getAttendance);
router.get("/", listUsers);

export default router;
