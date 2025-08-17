// import express from "express";
// import {
//   addUser,
//   listUsers,
//   getAttendance,
// } from "../controllers/user.controller.js";
// import { listEmployees } from "../controllers/employee.controller.js";
// import { createEmployees } from "../services/employee.service.js";

// const router = express.Router();

// router.post("/", createEmployees);
// router.get("/", listEmployees);

// export default router;

import express from "express";
import {
  attendance,
  createEmployees,
  dailyAttendance,
  // getLates, // controller function
  listEmployees,
  // monthlyLates,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/", createEmployees); // FIXED
router.get("/", listEmployees);
// router.get("/lates", getLates);
// router.get("/monthly-lates", monthlyLates);
router.get("/attendance", attendance);
router.get("/daily-attendance", dailyAttendance);

export default router;
