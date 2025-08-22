import express from "express";
import {
  addUser,
  listUsers,
  getAttendance,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", addUser);
router.get("/attendance", getAttendance);
router.get("/", listUsers);

export default router;
