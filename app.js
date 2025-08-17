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
