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
  createEmployees, // controller function
  listEmployees,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/", createEmployees); // FIXED
router.get("/", listEmployees);

export default router;
