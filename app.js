// server.js (Node.js + Express backend)
// const express = require("express");
// const ZKLib = require("node-zklib");
// const cors = require("cors");

// const app = express();
// const port = 3001;

// app.use(cors());

// app.get("/attendance-logs", async (req, res) => {
//   const zk = new ZKLib("192.168.1.201", 4370, 10000, 4000); // Use your device's IP

//   try {
//     await zk.createSocket();
//     const logs = await zk.getAttendances();
//     await zk.disconnect();
//     res.json(logs.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Failed to retrieve logs");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/user.routes.js";
import employeeRoutes from "./src/routes/employee.routes.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS middleware (must come before routes)
app.use(cors());
app.use(express.json());

// Body parser middleware (to parse JSON request bodies)
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);

// Error-handling middleware (should come after routes)
app.use(errorMiddleware);

export default app;
